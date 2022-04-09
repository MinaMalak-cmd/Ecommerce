import "../../App.css";
import { Card } from "react-bootstrap";
import { IProduct } from "../../Interface/IProduct";
interface IProps {
  product: IProduct
}
function Product(props: IProps ) {
  const product=props.product;
  function clickHandler() {
    console.log("clicked");
  }
  return (
    <div className="col-lg-4 col-sm-12">
      <Card className="w-100">
        <Card.Img variant="top" src={product.image.src} />
        <Card.Body>
          <button className="btn btn-dark">ADD TO CART</button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
