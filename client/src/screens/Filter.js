import React, {useState ,useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterProducts, sortProducts , filterCategory , filterGender, filterSearch} from "../actions/productActions";
import { fetchProducts } from "../actions/productActions";
import './Filter.css'

function Filter() {

   const [all ,setAll] = useState('blue')
   const [man, setMan] = useState('black')
   const [woman , setwoman] = useState('black')
   const [title , setTitle] = useState()
   
   const productList = useSelector((state) => state.products);
   const { items , size , category ,filteredItems , sort , gender} = productList;
  
   const dispatch = useDispatch();

   const search = (e) =>{
    
     e.preventDefault();
     dispatch(filterSearch(filteredItems,title))
    //  setTitle('')
     console.log(title);
     console.log(filteredItems.filter(x =>x.title.match(title) || x.description.match(title) || x.gender.match(title) || x.category.match(title)));
   }

  useEffect(() => {
  
    if(title === ''){
        dispatch(fetchProducts());
    }

  },[title])
  
 

   // check if items display if not
    return  !filteredItems ? (
      <div>Loading...</div>
    ) : (
      // if yes 
      <div className="filter">
        <div className="filter-result">
        {/* show count of items */}
          {filteredItems.length} Products
        </div>
        {/* serch input for gender or title or description */}
         <div><input className="search" type="text" placeholder="Search"  onChange={(e) => setTitle(e.target.value)}></input></div> 
         <div><button  className ="but" onClick={search}>SEARCH</button></div>
       
        <div>
            <Link href="#" style={{color: all}}  onClick={() => (setAll('blue'),setMan('black'),setwoman('black'), dispatch(filterGender(items ,size ,category , '')))}>ALL</Link> <b> / </b>
            <Link href="#" style={{color: man}} onClick={() => (setMan('blue'),setAll('black'),setwoman('black'), dispatch(filterGender(items ,size ,category ,'man' )))}>MAN</Link> <b> / </b>
            <Link href="#" style={{color: woman}}  onClick={() => (setwoman('blue'),setAll('black'),setMan('black'), dispatch(filterGender(items ,size ,category ,'woman' )))}>WOMAN</Link>
            
        </div>
       
          {/* filter lowest and highest and latest*/}
        <div className="filter-sort">
          Order{" "}
          <select
             value={sort}
             onChange={(e) =>
             dispatch(sortProducts(filteredItems, e.target.value)) 
            }
           >
             <option value="latest">Latest</option>
             <option value="lowest">Lowest</option>
             <option value="highest">Highest</option>
           </select>
        </div>
       {/* filter sizes */}
        <div className="filter-size">
           Filter{" "} 
           <select
              value={size}
              onChange={(e) => dispatch(filterProducts(items, e.target.value, category , gender))
             }
            >
              <option value="">ALL</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
           </select>
        </div>
     {/* filter category */}
         <div className="filter-size">
            Category{" "} 
           <select
             value={category}
             onChange={(e) => dispatch(filterCategory(items, e.target.value , size , gender))
           }
          >
              <option value="">ALL</option>
              <option value="pants">PANTS</option>
              <option value="skirts">SKIRTS</option>
              <option value="suit">SUIT</option>
              <option value="tie">TIE</option>
              <option value="dress">DRESS</option>
            </select>
        </div>
      </div>
    );
}
export default Filter