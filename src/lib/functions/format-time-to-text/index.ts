export const formatTimeToText = (time: string): string => {
  // Проверка формата времени
  if (!/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return "Неверный формат времени";
  }

  const [h, m, s] = time.split(":").map(Number);

  // Проверка на отрицательные значения
  if (h < 0 || m < 0 || s < 0) {
    return "Время не может быть отрицательным";
  }

  const format = (num: number, words: string[]): string => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;

    if (n >= 10 && n <= 19) {
      return `${num} ${words[2]}`;
    }

    if (n1 === 1) return `${num} ${words[0]}`;
    if (n1 >= 2 && n1 <= 4) return `${num} ${words[1]}`;
    return `${num} ${words[2]}`;
  };

  const parts: string[] = [];

  if (h > 0) parts.push(format(h, ["час", "часа", "часов"]));
  if (m > 0) parts.push(format(m, ["минуту", "минуты", "минут"]));
  if (s > 0 || parts.length === 0)
    parts.push(format(s, ["секунду", "секунды", "секунд"]));

  return parts.join(" ");
};
