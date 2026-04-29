// Lokal dev mühiti üçün mock — real DB əməliyyatları edir
// Real mühitdə functions/sifarisOdenisKassa.ts (Deno/Edge) işləyir

export async function sifarisOdenisKassa({ sifaris_id, odenis_statusu, kohne_odenis_statusu, qismen_mebleg }) {
  const db = globalThis.__B44_DB__;
  if (!db) return { success: false };

  try {
    const sifaris = await db.entities.Sifaris.get(sifaris_id);
    if (!sifaris) return { error: 'Sifariş tapılmadı' };

    const mebleg = parseFloat(qismen_mebleg) || 0;

    if (odenis_statusu === 'Qismən ödənilib' && mebleg > 0) {
      // Kumulativ ödənilmiş məbləği yenilə
      const artiqOdenilmis = sifaris.odenilmis_mebleg || 0;
      const yeniOdenilmis = artiqOdenilmis + mebleg;
      await db.entities.Sifaris.update(sifaris_id, { odenilmis_mebleg: yeniOdenilmis });

      // KassaEmeliyyati qeydi yarat
      const kassalar = await db.entities.Kassa.filter({ status: 'Aktiv' });
      if (kassalar.length > 0) {
        await db.entities.KassaEmeliyyati.create({
          kassa_id: kassalar[0].id,
          tip: 'Mədaxil',
          kateqoriya: 'Xidmət ödənişi',
          mebleg: mebleg,
          valyuta: 'AZN',
          odenis_metodu: 'Nağd',
          tarix: new Date().toISOString(),
          sifaris_id: sifaris_id,
          musteri_id: sifaris.musteri_id || '',
          aciklama: `Qismən ödəniş: ${sifaris.sifaris_no || sifaris_id} — ${sifaris.musteri_adi || ''}`,
          status: 'Təsdiqləndi',
        });
      }
      return { success: true, mebleg: yeniOdenilmis };
    }

    if (odenis_statusu === 'Ödənilib') {
      // Tam ödəniş — ümumi məbləği odenilmis_mebleg-ə yaz
      const tamMebleg = sifaris.umumi_mebleg || sifaris.qiymet || 0;
      const artiqOdenilmis = sifaris.odenilmis_mebleg || 0;
      const qalan = tamMebleg - artiqOdenilmis;
      await db.entities.Sifaris.update(sifaris_id, { odenilmis_mebleg: tamMebleg });
      if (qalan > 0) {
        const kassalar = await db.entities.Kassa.filter({ status: 'Aktiv' });
        if (kassalar.length > 0) {
          await db.entities.KassaEmeliyyati.create({
            kassa_id: kassalar[0].id,
            tip: 'Mədaxil',
            kateqoriya: 'Xidmət ödənişi',
            mebleg: qalan,
            valyuta: 'AZN',
            odenis_metodu: 'Nağd',
            tarix: new Date().toISOString(),
            sifaris_id: sifaris_id,
            musteri_id: sifaris.musteri_id || '',
            aciklama: `Tam ödəniş: ${sifaris.sifaris_no || sifaris_id} — ${sifaris.musteri_adi || ''}`,
            status: 'Təsdiqləndi',
          });
        }
      }
      return { success: true, mebleg: tamMebleg };
    }

    return { success: true };
  } catch (e) {
    console.error('[sifarisOdenisKassa mock error]', e);
    return { error: e.message };
  }
}
