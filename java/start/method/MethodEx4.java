package basic.method;

import java.util.Scanner;

public class MethodEx4 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int price;
    int currentPrice = 0;

    while (true) {
      print();
      int menu = sc.nextInt();
      if (menu == 1) {
        System.out.println("입금액을 입력하시오: ");
        price = sc.nextInt();
        currentPrice = input(price, currentPrice);
      } else if (menu == 2) {
        System.out.println("출금액을 입력하시오: ");
        price = sc.nextInt();
        currentPrice = output(price, currentPrice);
      } else if (menu == 3) {
        System.out.println("현재 잔액: " + currentPrice);
      } else if (menu == 4) {
        System.out.println("종료");
        break;
      }
    }
  }

  public static void print() {
    System.out.println("------------------------------------");
    System.out.println("1. 입급 | 2. 출급 | 3. 잔액 확인 | 4. 종료");
    System.out.println("------------------------------------");
    System.out.print("선택: ");
  }

  public static int input(int price, int currentPrice) {
    currentPrice += price;
    System.out.println("입급액을 입력하시오: ");
    System.out.println(price + "원을 입금하였습니다. " + "현재 잔액:" + currentPrice);
    return currentPrice;
  }

  public static int output(int price, int currentPrice) {
    if (currentPrice >= price) {
      currentPrice -= price;
      System.out.println(price + "원을 출급하였습니다. 현재잔액: " + currentPrice);
    } else {
      System.out.println(price + "원을 출금하려 했으나 잔액이 부족합니다.");
    }
    return currentPrice;
  }
}
