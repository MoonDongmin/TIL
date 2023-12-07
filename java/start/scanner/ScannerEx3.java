package basic.scanner;

import java.util.Scanner;

public class ScannerEx3 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.printf("음식 이름을 입력해주세요: ");
    String food = sc.nextLine();

    System.out.printf("음식의 가격을 입력해주세요: ");
    int price = sc.nextInt();

    System.out.printf("음식의 수량을 입력해주세요: ");
    int num = sc.nextInt();

    int sum = price * num;

    System.out.println(food + " " + num + "개를 주문하셨습니다. 총 가격은 " + sum + "원입니다.");
  }
}
