import { DayOfWorkEnum } from "src/enums/DayOfWorkEnum";

export interface ActivityHoursType {
  day: DayOfWorkEnum;
  isActive: boolean;
  from: string;
  to: string;
}
