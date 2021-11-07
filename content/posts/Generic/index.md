---
title: "Generic -  Invariance, Covariance, Contravariance"
date: 2021-11-07
slug: "Generic -  Invariance, Covariance, Contravariance"
excerpt: "-"
tags:
  - Java,Generic,Covariance,Contravariance
---
Spring batch를 쓰다보면 ItemWriter에 `void write(List<? extends T> var1)`  이런 메서드가 있어 왜 저런 제네릭 타입을 쓰는걸까 궁금했었는데 이제서야 찾아보게 되었다.

contravariance 개념에 대한 글들을 봐도 뭔가 직관적이지 않아서 이해하는데에만 몇 시간이나 걸려버렸다(ㅂㄷㅂㄷ..)

## Generic 용어

처음엔 일단 뭐라고 검색해야할지 명칭조차 까먹어서 다시 정리를 해봤다. 이펙티브 자바에 나오는 용어 기준이다.

- `?` : wildcard. unknown type을 나타낸다
- `List<?>`: unbounded wildcard type(비한정적 와일드카드 타입)
- `List<? extends Integer>`, `List<? super Integer>` : bounded wildcard type(한정적 와일드카드 타입)
    - `? super Integer`  : Integer이거나 Integer의 supertype이란 뜻
    - `? extends Integer` : Integer이거나 Integer의 subtype이란 뜻
- `E` : formal type parameter(정규타입 매개변수)
- `List<E>` : generic type

## Invariance, Covariance, Contravariance

- type과 subtype간의 관계
- 각각 불공변, 공변성, 반공변성으로 번역할 수 있는데...차라리 영어가 더 쉽다
    - in- 은 not, co- 는 함께, contra- 는 반대의
    - covariant: A가 B의 subtype이면 f(A)도 f(B)의 subtype
    - contravariant: A가 B의 subtype이면 f(B)가 f(A)의 subtype
    - invariant: 위에꺼 둘다 안됨

### Invariance

```java
interface Animal {
	void eat()
}
class Panda extends Animal {
	void eat()
}
```

- Panda는 Animal의 하위 타입이지만, `List<Panda>`는 `List<Animal>`의 하위타입이 아니다.
    - Panda는 Animal이 하는 일(eat())을 수행하는데 문제가 없지만,
    - `List<Panda>`는 `List<Animal>`이 하는 일 (온갖 종류의 Animal 타입을 add하기)를 할 수 없기 때문(Panda타입만 add할 수 있다)
- ⇒ 클래스의 상속관계가 Generics에서는 상속관계로 유지되지 않는 것을 Invariance라고 한다
Generics는 컴파일 단계에서 Generics의 타입이 지워지기 때문. 예시에서 JVM은 Runtime에 List 객체만 알고 있게 된다.

- 아래 코드와 같은 상황이 컴파일 가능하려면, Invariance로는 안된다.

```java
void copyAll(Collection<Object> to, Collection<String> from) {
    to.addAll(from); 
}
```

⇒ 이런 상황에서 유연성을 극대화하기 위해 bounded wildcard (한정적 와일드카드) 타입을 사용한다. 

### Covariance

- `? extends T`(Kotlin: `<out T>`)
- String이 Object의 하위타입이니 Collection<String> 도 Collection<? extends Object>의 하위타입으로 쓸 수 있다

```java
// Stack 의 메서드
public void pushAll(Iterable<? extends E> src) {
	for (E e : src) 
		push(e); // src매개변수는 Stack이 사용할 E인스턴스를 생산함
}

Stack<Number> numberStack = new Stack<>();
Iterable<Interger> integers = ...;
numberStack.pushAll(intergers);
```

- List<? extends T>에는 read(get) 만 할수있고, add는 할 수 없다. (이유는 밑에서 설명)

```java
List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);
List<? extends Number> numbers = doubles; // ok

Number number = numbers.get(0);
System.out.println(number);
numbers.add(1.1); // compile error
```

### Contravariance

- `? super T` (Kotlin: `<in T>`)
- Integer가 Number의 하위타입 →  `Collection<Number>`를 `Collection<? super Integer>`의 하위타입으로 쓸 수 있다

```java
// Stack 의 메서드
public void popAll(Collection<? super E> dst) {
	while (!isEmpty())
		dst.add(pop()); // dst 매개변수는 Stack으로부터 E인스턴스를 소비함
}

Stack<Number> numberStack = new Stack<>();
Collection<Object> objects = ...;
numberStack.popAll(objects);
```

- `List<? super T>`에는 read(get)은 할 수 없고, add는 할 수 있다. (이유는 밑에서 설명)

```java
public void addNumber(List<? super Integer> numbers) {
    numbers.add(6);
    // numbers.get(0); 컴파일 에러
}

List<Number> myInts = new ArrayList<>();
addNumber(myInts);

System.out.println(myInts); // 정상
```

## PECS

`<? extends T>`와 `<? super T>`를 각각 언제 써야할까?

이펙티브 자바에서는 PECS를 기억하면 된다고 소개하고 있다.

- **producer-extends, consumer-super.** (다른 말로는 Get and Put Principle도 있음)
- 매개변수화 타입 T가 생산자라면 `<? extends T>`, 소비자라면 `<? super T>` 를 써야한다는 뜻.
    - producer : 데이터를 제공하는 역할. read only
    - consumer: 정보를 받아 사용하는 역할. writeonly
    - 😵‍💫   consumer가 정보를 받는건데 consumer가 read를 해야하는것 아닌가요? - 라고 생각했는데
        - 예를들어 `List<T>` 라면 'List의 관점'에서 봐야 한다.
        - → producer는 read를 할 수 있게 제공을 하고, consumer일때는 외부에서 write해주는걸 받아 채워넣는다
- 주의) 메서드의 return type에는 이러한 한정적 wildcard를 쓰면 안됨. client코드에서도 wildcard타입을 써야하기 때문. 유연성을 높여주지 않는다.
    
    ```java
    public T method1() {} // ok
    public <? extends T> method2() {} // nope!
    ```

---

### References

- 'Effective Java' 3판 item31
- [https://stackoverflow.com/questions/2723397/what-is-pecs-producer-extends-consumer-super/19739576#19739576](https://stackoverflow.com/questions/2723397/what-is-pecs-producer-extends-consumer-super/19739576#19739576)  → PECS 이해에 도움
- [https://seob.dev/posts/공변성이란-무엇인가/](https://seob.dev/posts/%EA%B3%B5%EB%B3%80%EC%84%B1%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/)
- [https://s2choco.tistory.com/20](https://s2choco.tistory.com/20)
- 
- [https://codechacha.com/ko/java-covariance-and-contravariance/](https://codechacha.com/ko/java-covariance-and-contravariance/)
- [https://sabarada.tistory.com/124](https://sabarada.tistory.com/124)
- [https://kotlinlang.org/docs/generics.html#declaration-site-variance](https://kotlinlang.org/docs/generics.html#declaration-site-variance)