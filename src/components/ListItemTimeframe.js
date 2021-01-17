import Calendar from 'assets/Calendar';
import {formatDate} from '_helpers/format-date';
import Tooltip from "@reach/tooltip";
import styled from 'styled-components';

function ListItemTimeframe({ listItem }) {
  const timeframeLabel = listItem.finishDate
    ? "Start and finish date"
    : "Start date";

  return (
    <Tooltip label={timeframeLabel} style={{
      height: "2rem",
      fontSize: "1.4rem",
      display: "flex",
      alignItems: "center",
    }}>
      <div aria-label={timeframeLabel} className="time-label">
        <Calendar />
        <span>
          {formatDate(listItem.startDate)}{" "}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  );
}



export default ListItemTimeframe;
