import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const CheifRecommends = () => {

    const menus = [
        {
            "_id": "642c155b2c4774f05c36eeaa",
            "name": "Haddock",
            "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.",
            "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg",
            "category": "salad",
            "price": 14.7
        },
        {
            "_id": "642c155b2c4774f05c36ee8c",
            "name": "Escalope de Veau",
            "recipe": "Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette",
            "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg",
            "category": "dessert",
            "price": 12.5
        },
        {
            "_id": "642c155b2c4774f05c36ee7c",
            "name": "Escalope de Veau",
            "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
            "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-5-370x247.jpg",
            "category": "popular",
            "price": 14.5
        },
    ]

    return (
        <div>
            <SectionTitle
                subHeading={"Should Try"}
                heading={"CHEF RECOMMENDS"}
            ></SectionTitle>
            <section className='grid grid-cols-1 md:grid-cols-2 scale-90 lg:grid-cols-3 gap-4'>
               {
                menus.map((menu,idx) =>  

                    <div key={menu._id} className="card  w-80  mx-auto bg-[##F3F3F3] shadow-lg">

                            <img src={menu.image} alt={menu.name} />

                        <div className="p-5 flex flex-col gap-4 justify-center items-center">
                            <h2 className="card-title font-bold">{menu.name}</h2>
                            <p className='font-medium'>{menu.recipe}</p>
                            <div className="card-actions justify-end ">
                            <button className={`btn duration-300 font-bold ${idx % 2 === 0 ? "text-orange-400 border-b-4 bg-white border-orange-400 hover:text-white hover:bg-orange-400 hover:border-b-4 hover:border-black " : "bg-black text-orange-400 hover:text-black hover:bg-orange-400 hover:border-b-4 hover:border-black" }`} >Add TO CART</button>
                            </div>
                        </div>
                    </div>

                )
               }
            </section>
        </div>
    );
};

export default CheifRecommends;