import { Badge } from "@mui/material";
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import styles from "VirtualClinic/components/Calendar/Calendar.module.css";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNav } from "VirtualClinic/hooks/useNav";

const initialValue = dayjs();

interface CoolCalendarProps {
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  daysToHighlight: Dayjs[];
  loading?: boolean;
}

const CoolCalendar: FC<CoolCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  daysToHighlight,
  loading,
}) => {
  const requestAbortController = useRef<AbortController | null>(null);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [loading]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();

    // make sure to highlight only if the month is the same as the current one
    var toHighlight = daysToHighlight.filter(
      (day) => day.month() === date.month()
    );
    var toHighlightDates = toHighlight.map((day) => day.date());

    setHighlightedDays(toHighlightDates);
    // setIsLoading(false);

    requestAbortController.current = controller;
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    // setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <div
              className={`w-[0.4rem] h-[0.4rem] rounded-full`}
              style={{ backgroundColor: "rgba(255, 56, 56, 1)" }}
            />
          ) : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          style={{
            fontFamily: "Cabin",
            fontWeight: 400,
            // color: "var(--dark-green)",
            color: "rgba(22, 59, 69, 1)",
            opacity: !isSelected ? 0.5 : 1,
          }}
        />
      </Badge>
    );
  }

  return (
    <DateCalendar
      defaultValue={initialValue}
      value={selectedDate}
      onChange={(newValue) => {
        setSelectedDate(newValue);
      }}
      loading={loading}
      onMonthChange={handleMonthChange}
      renderLoading={() => <DayCalendarSkeleton />}
      slots={{
        day: ServerDay,
      }}
      slotProps={{
        day: {
          highlightedDays,
        } as any,
      }}
      views={["year", "month", "day"]}
    />
  );
};

export default CoolCalendar;
