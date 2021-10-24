import React from 'react'
import './FeaturedInfo.css'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';


export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Bruh</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2,45</span>
                    <span className="featuredMoneyRate">
                        -11.4 <TrendingDownIcon className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Bruh</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2,24</span>
                    <span className="featuredMoneyRate">
                        +3.4 <TrendingUp className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Bruh</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2,24</span>
                    <span className="featuredMoneyRate">
                        +3.4 <TrendingUp className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

        </div>
    )
}
