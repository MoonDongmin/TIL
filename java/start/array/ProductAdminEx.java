package basic.array;

import java.util.Scanner;

public class ProductAdminEx {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int max = 10;

    String[] productNames = new String[max];
    int[] productPrices = new int[max];
    int productCount = 0;

    while (true) {
      System.out.println("1. 상품등록 | 2. 상품목록 | 3. 종료");
      System.out.print("메뉴를 선택하세요: ");
      int menu = sc.nextInt();
      sc.nextLine();
      if (productCount == max) {
        System.out.println("더이상 추가할 수 없습니다.");
        continue;
      }
      if (menu == 1) {
        System.out.print("상품 이름을 입력하세요: ");
        productNames[productCount] = sc.nextLine();

        System.out.print("상품 가격을 입력하세요: ");
        productPrices[productCount] = sc.nextInt();
        productCount++;
      } else if (menu == 2) {
        for (int i = 0; i < productCount; i++) {
          System.out.println(productNames[i] + ": " + productPrices[i] + "원");
        }
      } else if (menu == 3) {
        break;
      } else {
        System.out.println("잘못된입력입니다.");
      }
    }
  }
}
