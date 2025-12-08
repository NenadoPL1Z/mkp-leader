import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ru from "dayjs/locale/ru";
import duration from "dayjs/plugin/duration";

dayjs.locale(ru);
dayjs.extend(utc);
dayjs.extend(duration);

export default dayjs;
