import { addZeroToNumber } from "helpers";
import "./OverviewStatsCard.scss";

interface IOverviewStatsCard {
  title: string;
  count: number;
}

const OverviewStatsCard: React.FC<IOverviewStatsCard> = ({ title, count }) => {
  return (
    <div className="overview-card">
      <p className="overview-card__count">{addZeroToNumber(count)}</p>
      <h3 className="overview-card__text">{title}</h3>
    </div>
  );
};
export default OverviewStatsCard;
