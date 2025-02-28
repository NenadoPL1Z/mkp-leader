import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ru from "dayjs/locale/ru";

dayjs.locale(ru);
dayjs.extend(utc);

export default dayjs;
