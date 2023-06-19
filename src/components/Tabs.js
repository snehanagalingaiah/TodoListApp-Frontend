


const Tabs = ({currentTab, setCurrentTab}) => 
{
	const TABS = ["ALL", "ACTIVE", "DONE"]


	return (
        TABS.map(tab => (
            <button className = {tab === currentTab? "button selected" : "button"} onClick={() => {setCurrentTab(tab)}}>
                {tab}
            </button>
        ))
    )

}

export default Tabs;