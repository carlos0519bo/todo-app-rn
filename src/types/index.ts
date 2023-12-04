export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  isToday: boolean;
  hour: Date;
  withAlert: boolean;
}
