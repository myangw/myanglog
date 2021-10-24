---
title: "interface vs abstract class in Java"
date: 2021-10-24
slug: "interface vs abstract class in Java"
excerpt: "-"
tags:
  - Java8,인터페이스,추상클래스,글또
---

흔한 질문같지만 생각보다 간단한 대답으로 끝날 질문은 아니다.

Java8에서 인터페이스에 '디폴트 메서드'를 추가할 수 있게 되어서 둘의 차이점이 많지 않아졌다. 언제 무엇을 쓰는게 바람직한가를 좀더 자세히 살펴봤다.

## 특징

먼저 기본적인 특징들을 살펴보자.

### 인터페이스

- 상수(static final ~) 와 추상메서드를 포함할 수 있다

```java
interface Barkable {
	public static final int BLABLA_CONSTANT = 1;
	public abstract void bark();
}
```

- Java8부터 디폴트 메서드 (안에 구현까지 작성 가능)를 포함할 수 있다
    - 디폴트 메서드: 인터페이스를 상속한 구현체에 공통으로 들어갈 코드를 디폴트 메서드에 작성하여 반복을 줄인다
    
    ```java
    // java.util.List에 있는 디폴트 메서드
    
    **default void replaceAll(UnaryOperator<E> operator) {
            Objects.requireNonNull(operator);
            final ListIterator<E> li = this.listIterator();
            while (li.hasNext()) {
                li.set(operator.apply(li.next()));
            }
    }**
    ```
    
- 스태틱 메서드를 가질 수 있다
    - 디폴트 메서드처럼 인터페이스에서 구현이 가능하다
        - 디폴트 메서드와 차이점은, overriding할 수 없다는 것
    - 스태틱 메서드이므로 `클래스.메서드()` 로 호출
- 하나의 구현체가 여러개의 인터페이스를 구현(implement)할 수 있다

### 추상 클래스

- `abstract` 키워드와 함께 선언한다.
    
    ```jsx
    abstract class Animal {
    }
    ```
    
- 추상 메서드를 가질 수 있다.
    - 추상 메서드는 구현부가 없는 메서드이다.
    - 추상 클래스에 추상 메서드가 반드시 필요하진 않지만, 추상메서드를 포함하는 클래스는 추상 클래스로 선언되어야 한다.
- 그 자체로 인스턴스화 할 수 없다.
    - 인스턴스화하려면 추상 클래스를 상속한 클래스를 만들어야한다

## Java8 interface의 default method

### 디폴트 메서드가 생긴 이유

- stackoverflow답변들을 보다보니 'backward compatibility'~~ 란 말이 있었다.
    - 무슨말인가 보니 JDK 개발자들이 코드를 수정할 때 인터페이스 하나에 메서드를 추가하면 줄줄이 그것을 구현하고 있는 클래스들 코드가 깨져서, 거꾸로 호환성을 유지하기 위해 만들었다고 한다.
        - 이미 있는 인터페이스에 새로운 메서드를 추가할 때 인터페이스 안에 구현이 있게되면 구현 클래스들에 영향을 받지 않기 때문.
        - 대표적인 예로 collection 인터페이스에 forEach 메서드가 디폴트 메서드로 lambda랑 같이 쓰게끔 추가되었다.
            
            ```java
            public interface Iterable<T> {
                public default void forEach(Consumer<? super T> consumer) {
                    for (T t : this) {
                        consumer.accept(t);
                    }
                }
            }
            ```
            
        - 디폴트 메서드를 처음부터 의도가 있어서 만들었다기보다 개발하다보니 필요해져서(?) 만든 것에 가까워서 'backward'라는 표현을 쓴 것 같다.

## 언제 무엇을 쓸까

- 추상클래스는 생성자가 있고, state를 들고있을 수 있다.
- 인터페이스의 default method는 구현체의 state를 참조할 수 없다.

### 인터페이스를 쓰는 것이 좋은 경우

이펙티브 자바에서는 '추상클래스보다 인터페이스를 우선하라'고 하며 여러 케이스들을 예로 든다.

1. 기존 클래스에 새로운 인터페이스 구현이 쉽다
    - 인터페이스가 요구하는 메서드들을 추가하고, implements하면 끝.
    - 추상클래스로는 단일 상속만 가능하므로, 새로 추상클래스를 끼워 넣으면 적절하지 않은 상황에서 서브클래스들이 추상클래스를 상속받는다.
2. mixin 정의 시 적절하다
    - 클래스의 원래의 주된 타입 외에 특정한 다른 선택적 기능을 'mix in'하여 제공한다고 선언하는 효과를 줄 수 있다.
    - ex. 어떤 클래스가 `Comparable` 을 구현하면, `Comparable` 을 구현한 인스턴스들끼리는 순서를 정할 수 있다고 선언하는 것.
3. 계층구조가 없는 타입 프레임워크를 만들 수 있다

---

### References

- 'Effective Java' 3판 - 조슈아 블로크 (item20. 추상클래스보다는 인터페이스를 우선하라)
- [http://muhammadkhojaye.blogspot.com/2014/03/interface-default-methods-in-java-8.html](http://muhammadkhojaye.blogspot.com/2014/03/interface-default-methods-in-java-8.html)
- [https://yaboong.github.io/java/2018/09/25/interface-vs-abstract-in-java8/](https://yaboong.github.io/java/2018/09/25/interface-vs-abstract-in-java8/)