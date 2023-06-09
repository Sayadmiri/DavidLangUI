const Filter = ({filter,setFilter}) => {
    return(
        <div className="flex justify-center mt-[50px]">
            <input onChange={(e)=>{setFilter(e.target.value)}} value={filter} type="text" className="w-[400px] text-black outline-0 p-3" placeholder="Search..."/>
        </div>
    );
};

export default Filter;