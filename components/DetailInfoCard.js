export default function DetailInfoCard({ ip, location, timezone, isp }) {
    return (
      <div className="flex flex-col md:flex-row gap-y-6 w-[327px] md:w-auto md:min-w-[555px] xl:w-[1110px] min-h-[294px] md:min-h-fit xl:min-h-[160px] bg-white text-center md:text-left p-6 rounded-xl">
        <div className="info-item">
          <h2 className="info-heading">IP ADDRESS</h2>
          <p className="info-text break-all">{ip}</p>
        </div>
        <span className="line" />
        <div className="info-item">
          <h2 className="info-heading">LOCATION</h2>
          <p className="info-text break-words">{location}</p>
        </div>
        <span className="line" />
        <div className="info-item">
          <h2 className="info-heading">TIMEZONE</h2>
          <p className="info-text break-all">{timezone}</p>
        </div>
        <span className="line" />
        <div className="info-item">
          <h2 className="info-heading">ISP</h2>
          <p className="info-text break-words">{isp}</p>
        </div>
        <div className="info-item">
          <h2 className="info-heading">TIMEZONE</h2>
          <p className="info-text break-all">{timezone}</p>
        </div>
        <span className="line" />
        <div className="info-item">
          <h2 className="info-heading">ISP</h2>
          <p className="info-text break-words">{isp}</p>
        </div>
      </div>
    );
  }
  