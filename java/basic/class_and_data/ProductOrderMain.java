package basic.class_and_data;

public class ProductOrderMain {
  public static void main(String[] args) {
    int sum = 0;
    
    ProductOrder productOrder1 = new ProductOrder("두부", 2000, 2);
    ProductOrder productOrder2 = new ProductOrder("김치", 3000, 5);
    ProductOrder productOrder3 = new ProductOrder("콜라", 1000, 1);


    ProductOrder[] productOrders = {productOrder1, productOrder2, productOrder3};


    for (ProductOrder productOrder : productOrders) {
      System.out.println("상품명: " + productOrder.productName + ", 가격: " + productOrder.productName +
              ", 수량: " + productOrder.quantity);
      sum += productOrder.price;
    }

    System.out.println("총 결제 금액: " + sum);
  }
}
