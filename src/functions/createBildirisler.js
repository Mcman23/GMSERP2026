// Lokal dev mühiti üçün mock — real tətbiqdə bu Base44 backend funksiyasıdır
// Real iş məntiqi: functions/createBildirisler.ts faylında

export async function createBildirisler(params) {
  console.log('[createBildirisler mock]', params);
  return { success: true, mock: true };
}
