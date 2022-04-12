import { useEffect, useState } from "react";
import { useProducts } from "../../hook/Products";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  picture: string;
  stock: number;
};

const Product = ({ id, name, price, picture, stock }: ProductProps) => {
  const { 
    setCart, 
    setCleanCart, 
    allProducts, 
    setAllProducts, 
    setExcludeProducts, 
    toogle, 
    setToogle,
    setValue} = useProducts();
  const [quantity,setQuantity] = useState(0)

  const quantityPlus = () => {
    if(quantity === stock){
      alert('Não temos mais produtos no estoque')
    }
    if(quantity < stock){
      setAllProducts(id)
    }
  }
  const quantityMinus = () => {
    const newAllProducts = allProducts
    newAllProducts.splice(newAllProducts.indexOf(id), 1)
    setExcludeProducts(newAllProducts)
    setValue(id,price)
  }
  const newPrice = () => {
    let finalValue:number = price
    if (quantity > 0){
      finalValue = quantity * price
    }
    const newPrice = finalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return newPrice
  }
  const addCart = () => {
    setCart(id,name,picture,price,stock)
  }

  const cartOperations = () => {
    let count = 0
    allProducts.forEach(product => {
      if (id === product) {
        count++
      }
    })
    if (count === 0) {setCleanCart(id);setValue(id,price)}
    setValue(id,count*price)
    setQuantity(count)
  }
  
  useEffect(() => {
    cartOperations()
  },[toogle]) 
  
  return (
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />
      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>Unidades: {stock}</Text>
          <Text>Valor total: {newPrice()}</Text>
        </Column>
        <WrapperIncrementor>
          <Incrementor 
            id={id} 
            quantity={quantity} 
            increaseValue={()=>{addCart();quantityPlus();setToogle()}}
            decrementValue={()=>{quantityMinus();setToogle()}} />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
  );
}

export default Product;
