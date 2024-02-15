package basic.static2.ex;

public class Car {
  private String carName;
  public static int carCount;

  public Car(String carName) {
    this.carName = carName;
    System.out.println("차량 구입, 이름: " + carName);

    carCount++;
  }

  public static void showTotalCars() {
    System.out.println("구매한 챠량 수: " + carCount);
  }
}
