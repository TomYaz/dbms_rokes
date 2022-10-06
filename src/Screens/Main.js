import React, { useEffect, useState } from 'react';
import Item from '../Components/Item';
import LeftMenu from '../Components/LeftMenu';
import Loader from '../Components/Loader';
import { pullData } from '../Firebase/FirebaseLoader';
import { gotToScreen } from '../HelperFunctions';
import './CSS/Main.css';

function Main() {

    const [filters, setFilters] = useState([]);
    const [loader, setLoader] = useState(true);
    const [items, setItems] = useState([]);

    let displayItems = [];

    useEffect(() => {
        window.resizeWindow();
        pullData().then((data) => {
            data.forEach(el => {
                displayItems.push(
                    <Item item={el} number={el.object_number} key={el.object_number}/>
                )
            });
            setTimeout(() => {
                setItems(displayItems.sort((a, b) => parseInt(a.props.number) - parseInt(b.props.number)));
                setLoader(false);
            }, 100)
        });
    }, []);


    return (
        <div className="Main">
            <div className='draggable' />
            <LeftMenu setFilters={setFilters} filters={filters} />

            {!loader &&
                <div className='main-container'>
                    <h1 id="filters">{filters.length > 0 ? "Selected " + filters.length + " filters" : "No filters selected"}</h1>
                    <h2>Displaying {items.length} items</h2>
                    <div className='item-container'>
                        {items}
                    </div>
                </div>
            }
            {loader &&
                <div className='main-container-loader'>
                    <Loader />
                </div>}
        </div>
    )
}

export default Main;
