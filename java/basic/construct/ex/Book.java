package basic.construct.ex;

public class Book {
  String title;
  String author;
  int page;

  Book() {
    // 나는 이 this를 사용하지 않긴함
    this("", "", 0);
  }

  Book(String title, String author) {
    this(title, author, 0);
  }

  Book(String title, String author, int page) {
    this.title = title;
    this.author = author;
    this.page = page;
  }

  void displayInfo() {
    System.out.println("제목: " + this.title + ", 저자: " + this.author + ", 페이지: " + this.page);
  }
}
