import { useRouter } from "next/router";
import { useState } from "react";
import DetailModule from "./DetailModule";
import MoulesData from './info1.json';

export default function SelectModule({setModuleInfo, moduleInfo}) {
    const router = useRouter()
    const [detailVisible, setDetailVisible] = useState(false)
    
    const handleModuleChange = (module) => {
        let foundAddress = null;
        // Check if the entered value is a model name from address.json

        const model = MoulesData.find(item => item.name === module);
        if (model) {
            foundAddress = model.address;
            setModuleInfo(model)

            console.log("-------this is dividens", model);
        } else {
            foundAddress = value; // Use the entered value as is
        }

        // Extract domain name without port from address
        const domain = foundAddress.replace(/^https?:\/\//, '').split(':')[0];

        if (domain) {
            router.replace(`/?value=${domain}`)
        }
    }
    return (
        <>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                maxWidth: "320px",
                background: "#fff",
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                padding: '12px 24px',
                margin: '20px',
                fontSize: '18px',
                lineHeight: 2,
                color: '#6b6b76',
                outline: 'none',
                borderRadius: '10px'
            }}>
                <h3 style={{ color: 'blue' }}>Please select module.</h3>
                <p>You can track IP address</p>
                <div style={{ width: '310px' }}>
                    <select
                        style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            width: '270px'

                        }}
                        onChange={(e) => handleModuleChange(e.target.value)}
                    >
                        <option value=''>Select Module</option>
                        {MoulesData.map((module, index) => <option key={index} value={module.name}>{module.name}</option>)}
                    </select>
                </div>
                <button
                    className="mx-20 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setDetailVisible(!detailVisible)}
                >
                    DetailInfo
                </button>
            </div>
            {detailVisible && (
                <DetailModule
                    name={moduleInfo.name}
                    address={moduleInfo.address}
                    emission={moduleInfo.emission}
                    dividends={moduleInfo.dividends                    }
                    regblock={moduleInfo.regblock}
                    last_update={moduleInfo.last_update}
                    balance={moduleInfo.balance}
                    stake={moduleInfo.stake}
                />
            )}
        </>
    )
}