import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import "./category.css";
import categoryApi from '../../api/categoryApi';
import { showNotification } from '../../utils/showNotification';

export default function Category() {

    const user = useSelector(state => state.user.currentUser);
    let history = useHistory();
    const location = useLocation();
    const categoryId = location.pathname.split("/")[2];
    const [category, setCategory] = useState('');
    const [formvalues, setFormvalues] = useState({ categoryId: categoryId, name: "" });

    useEffect(async () => {
        if (user) {
            const res = await categoryApi.get(categoryId);
            if (res !== null && res !== undefined) {
                setCategory(res);
            }
        }
        else{
            history.push('/signin');
        }
    }, [])

    useEffect(() =>{
        if(!user){
            history.push('/signin');
        }
    }, [user])

    useEffect(() => {
        setFormvalues({
            categoryId: category && category.categoryId,
            name: category && category.name,
        })
    }, [category])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formvalues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await categoryApi.update(categoryId, formvalues)
        if (res !== undefined && res !== null) {
            setCategory(res);
            console.log(res);
            showNotification('success', 'Great', 'Update Category successful', 'OK', () => history.push("/categories"))
        }
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Category</h1>
                {/* <Link to="/newdelivery"> */}
                <button onClick={handleSubmit} className="productAddButton">Edit</button>
                {/* </Link> */}
            </div>

            <div className="productTop">
                <div className="productTopLeft">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Category ID: </span>
                            <span className="productInfoValue">{category ? category.categoryId : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Category Name: </span>
                            <span className="productInfoValue">{category ? category.name : ""}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm" >
                    <div className="productFormLeft">
                        <label>Category Name</label>
                        <input
                            type="text"
                            placeholder={category ? category.name : ""}
                            name="name"
                            value={formvalues.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
