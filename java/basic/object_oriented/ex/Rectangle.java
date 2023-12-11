package basic.object_oriented.ex;

public class Rectangle {
  int width;
  int height;

  void area() {
    int area = width * height;
    System.out.println("넓이: " + area);
  }

  void perimeter() {
    int perimeter = width * 2 + height * 2;
    System.out.println("둘레 길이: " + perimeter);
  }

  void square() {
    if (width == height) {
      System.out.println("정사각형입니다.");
    } else System.out.println("정사각형이 아닙니다.");
  }
}
