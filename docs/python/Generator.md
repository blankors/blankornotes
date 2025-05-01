

## 本文贡献及读者对象



相关文章具体未考虑哪些方面，见‘参考文章及评论’小节



## 问题

- 为什么要用生成器？
- 生成器替代的是什么方案？



为什么要用生成器？

首先想到的场景是——从硬盘中读取数据到内存。

假如数据过大，‘一次性’读取全部数据到内存会导致内存不足，而生成器可以‘在需要时’读取‘你所需数量’的数据。‘一次性’意味着无论你是否需要都会把全部数据读取到内存。



生成器替代的是什么方案？

‘生成器’就是一个‘函数’。当提到生成器，首先想到的可能是yield关键词，它替代了函数中return。执行到 yield时，函数会暂停执行而不会立即结束，函数的局部变量和执行状态会被保存，返回 yield后面的值。下次调用 `__next__()` 方法时，函数会从上次暂停的地方继续执行。



## 快速上手



例如我们要实现一个读取数据（从文件中）的函数



```python
def read_data(file_path):
    data = []
    with open(file_path) as f:
        for line in f:
            data.append(line)
    return line

read_data('./data.txt')
```





```python
def read_data(file_path):
    with open(file_path) as f:
        for line in f:
            yield line

```



## 官方文档





## 例子



### Case1

定义一个对一组数据归一化的函数

```python
def normalize(numbers):
    total = sum(numbers)
    result = []
    for value in numbers:
        percent = 100 * value / total
        result.append(percent)
    return result

def read_visits(data_path):
    with open(data_path) as f:
        for line in f:
            yield int(line)
```

通过生成器，计算全部数据归一化的结果

```python
it = read_visits('my_numbers.txt')
percentages = normalize(it)

print(percentages)
# 预期输出 [0.x, 0.x, ...]
# 实际输出 []
```

原因在于，迭代器只能产生一次结果。假如迭代器或生成器已经抛出过StopIteration异常，继续用它来构造列表或是像normalize那样对它做for循环，那它不会给出任何结果。



我们并没有捕获这个StopIteration异常，为什么没有报错？

for循环、list构造器以及Python标准库的其他许多函数，都认为迭代器在正常的操作过程中抛出StopIteration异常是很自然的。它们没办法区分，这个迭代器是本身就没有数据可以提供，还是虽然有数据，但现在已经耗尽了。



### Case2

如何修改Case1中出现的问题使得输出符合预期？

在函数作用域下将‘生成器所能产生的所有结果’保存到一个列表中

```python
def normalize_copy(numbers):
    numbers_copy = list(numbers)  # Copy the iterator
    # total = sum(numbers_copy) # 在这条语句之前添加
    # ...
```



这样的修改还有什么问题？

显然这样的做法是鸡肋的——本来为了不让



```python
def normalize_copy(numbers):
    numbers_copy = list(numbers)  # Copy the iterator
    total = sum(numbers_copy)
    result = []
    for value in numbers_copy:
        percent = 100 * value / total
        result.append(percent)
    return result
```



例子的特点

- 有多个位置迭代生成器



## 好像没有生成器也可以









## 总结

概念

- 生成器
- 迭代器
- 可迭代对象



## 参考文章及评论



## 附录



- [**generator**](https://docs.python.org/3/glossary.html#term-generator), [[1\]](https://docs.python.org/3/glossary.html#index-18)

- - [expression](https://docs.python.org/3/reference/expressions.html#index-22)
  - [function](https://docs.python.org/3/reference/datamodel.html#index-39), [[1\]](https://docs.python.org/3/reference/expressions.html#index-23), [[2\]](https://docs.python.org/3/reference/simple_stmts.html#index-26)
  - [iterator](https://docs.python.org/3/reference/datamodel.html#index-39), [[1\]](https://docs.python.org/3/reference/simple_stmts.html#index-26)
  - [object](https://docs.python.org/3/reference/datamodel.html#index-61), [[1\]](https://docs.python.org/3/reference/expressions.html#index-22), [[2\]](https://docs.python.org/3/reference/expressions.html#index-31)

- [Generator      (class in collections.abc)](https://docs.python.org/3/library/collections.abc.html#collections.abc.Generator)

- - [(class       in email.generator)](https://docs.python.org/3/library/email.generator.html#email.generator.Generator)
  - [(class       in typing)](https://docs.python.org/3/library/typing.html#typing.Generator)

- [**generator expression**](https://docs.python.org/3/glossary.html#term-generator-expression), [[1\]](https://docs.python.org/3/glossary.html#index-19)

- [**generator iterator**](https://docs.python.org/3/glossary.html#term-generator-iterator)

- [GeneratorExit](https://docs.python.org/3/library/exceptions.html#GeneratorExit)

- - [exception](https://docs.python.org/3/reference/expressions.html#index-33), [[1\]](https://docs.python.org/3/reference/expressions.html#index-37)

- [GeneratorExp      (class in ast)](https://docs.python.org/3/library/ast.html#ast.GeneratorExp)

- [GeneratorType      (in module types)](https://docs.python.org/3/library/types.html#types.GeneratorType)



function

https://docs.python.org/3/glossary.html#term-function

A series of statements which returns some value to a caller. 



return

https://docs.python.org/3/reference/simple_stmts.html#index-24

[`return`](https://docs.python.org/3/reference/simple_stmts.html#return) may only occur syntactically nested in a function definition, not within a nested class definition.



yield

https://docs.python.org/3/reference/expressions.html#yield-expressions

The yield expression is used when defining a generator function or an asynchronous generator function and thus can only be used in the body of a function definition. Using a yield expression in a function’s body causes that function to be a generator function, and using it in an async def function’s body causes that coroutine function to be an asynchronous generator function. 



