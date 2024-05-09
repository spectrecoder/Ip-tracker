export default function DetailModule({ name, address, emission, dividends, regblock, last_update, balance, stake }) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-y-6 w-[327px] md:w-auto md:min-w-[555px] xl:w-[1110px] min-h-[294px] md:min-h-fit xl:min-h-[160px] bg-white text-center md:text-left p-6 rounded-t-xl">
                <div className="info-item">
                    <h2 className="info-heading">NAME</h2>
                    <p className="info-text break-all">{name}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">ADDRESS</h2>
                    <p className="info-text break-words">{address}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">EMISSION</h2>
                    <p className="info-text break-all">{emission}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">DIVIDENDS</h2>
                    <p className="info-text break-words">{dividends}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-y-6 w-[327px] md:w-auto md:min-w-[555px] xl:w-[1110px] min-h-[294px] md:min-h-fit xl:min-h-[160px] bg-white text-center md:text-left p-6 rounded-b-xl">
                <div className="info-item">
                    <h2 className="info-heading">REGBLOCK</h2>
                    <p className="info-text break-all">{regblock}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">LASTUPDATE</h2>
                    <p className="info-text break-words">{last_update}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">BALANCE</h2>
                    <p className="info-text break-all">{balance}</p>
                </div>
                <span className="line" />
                <div className="info-item">
                    <h2 className="info-heading">STAKE</h2>
                    <p className="info-text break-words">{stake}</p>
                </div>
            </div>
        </>
    );
}
