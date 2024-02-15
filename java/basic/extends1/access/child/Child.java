package basic.extends1.access.child;

import basic.extends1.access.parent.Parent;

public class Child extends Parent {
  public void call(){
    publicValue = 1;
    protectedValue = 1; // 상속 관계 or 같은 패키지
//    defaultValue = 1; // 다른 패키지에 접근 불가, error
//    privateValue = 1; // 접근 불가, error

    publicMethod();
    protectedMethod();
//    defaultMethod(); // 다른 패키지에 접근 불가, error
//    privateMethod(); // 접근 불가, error

    printParent();
  }
}
