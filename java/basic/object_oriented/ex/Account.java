package basic.object_oriented.ex;

public class Account {
  int balance; // 잔액

  void deposit(int amount) {
    balance += amount;
    System.out.println("잔고: " + balance);
  }

  void withdraw(int amount) {
    if (balance < amount) {
      System.out.println("잔액 부족");
    } else {
      balance -= amount;
      System.out.println("잔고: " + balance);
    }
  }

  void showBalance() {
    System.out.println("잔고: " + balance);
  }
}
