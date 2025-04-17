

# 本文贡献





从Python官方文档中看，有3处地方与with有关

1. [3. Data model — Python 3.13.3 documentation](https://docs.python.org/3/reference/datamodel.html#context-managers)
2. [8. Compound statements — Python 3.13.3 documentation](https://docs.python.org/3/reference/compound_stmts.html#with)
3. [Built-in Types — Python 3.13.3 documentation](https://docs.python.org/3/library/stdtypes.html#typecontextmanager)
4. [PEP 343 – The “with” Statement | peps.python.org](https://peps.python.org/pep-0343/)



# doc



## 1

3.3.9. With Statement Context Managers

> https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers
>
> 文档路径：python reference - datamodel - Special method names - With Statement Context Managers

A *context manager* is an object that defines <u>the runtime context</u> to be established when executing a [`with`](https://docs.python.org/3/reference/compound_stmts.htmlith) statement. The context manager handles <u>the entry into</u>, and <u>the exit from</u>, <u>the desired runtime context</u> for <u>the execution of the block of code</u>. Context managers are normally invoked using the `with` statement (described in section [The with statement](https://docs.python.org/3/reference/compound_stmts.htmlith)), but can also be used by directly invoking their methods.

<u>Typical uses of context managers</u> include 

- saving and restoring various kinds of global state, 
- locking and unlocking resources, 
- closing opened files, etc.

For more information on context managers, see [Context Manager Types](https://docs.python.org/3/library/stdtypes.htmlypecontextmanager). The [`object`](https://docs.python.org/3/library/functions.htmlbject) class itself does not provide <u>the context manager methods</u>.`object` 类本身不提供上下文管理器方法

- object.**__enter__**(*self*)

  Enter <u>the runtime context related to this object</u>. The [`with`](https://docs.python.org/3/reference/compound_stmts.htmlith) statement will **bind** <u>this method’s return value</u> to <u>the target(s)</u> specified in the `as` clause of the statement, if any.

  进入与此对象相关的运行时上下文。 `with` 语句将把此方法的返回值绑定到语句的 `as` 子句中指定的目标，如果有的话。

- object.**__exit__**(*self*, *exc_type*, *exc_value*, *traceback*)

  Exit <u>the runtime context related to this object</u>. The parameters describe the exception that caused the context to be exited. If the context was exited without an exception, all three arguments will be [`None`](https://docs.python.org/3/library/constants.htmlone).If an exception is supplied, and the method wishes to suppress the exception (i.e., prevent it from being propagated), it should return a true value. Otherwise, the exception will be processed normally upon exit from this method.Note that [`__exit__()`](https://docs.python.org/3/reference/datamodel.htmlbject.__exit__) methods should not reraise the passed-in exception; this is the caller’s responsibility.
  
  退出与此对象相关的运行时上下文。参数描述了导致上下文退出的异常。如果在没有异常的情况下退出上下文，则所有三个参数将为 `None` 。
  

Note that `__exit__()` methods should not **reraise** the passed-in exception; this is the caller’s responsibility.
请注意， __exit__() 方法不应重新抛出传入的异常；这由调用者负责。

See also

- [**PEP 343**](https://peps.python.org/pep-0343/) - The “with” statement

  The specification, background, and examples for the Python [`with`](https://docs.python.org/3/reference/compound_stmts.htmlith) statement.



[^]

为什么要强调‘The object class itself does not provide the context manager methods.’？在Python文档有没有其它类似的地方？

强调 `object` 类本身不提供上下文管理器方法的原因

1. 避免误解
在 Python 中，`object` 类是所有类的基类。开发者可能会误以为所有从 `object` 类继承的类都天然具备上下文管理器的功能，因为继承可能会带来一些默认的行为。所以文档特意强调 `object` 类本身不提供上下文管理器方法，让开发者明确如果要使用上下文管理器，需要自己去实现 `__enter__` 和 `__exit__` 方法（对于基于生成器的上下文管理器，要使用 `contextlib` 模块的相关装饰器）。

2. 明确实现要求
上下文管理器的核心是 `__enter__` 和 `__exit__` 方法，这两个方法是实现上下文管理功能的关键。`object` 类没有提供这两个方法，意味着任何想要成为上下文管理器的类都必须显式地定义这两个方法，或者使用 `contextlib` 模块中的工具来创建上下文管理器。

Python 文档中类似强调的地方

1. 关于迭代器和可迭代对象
在 Python 文档中，对于迭代器和可迭代对象也有类似的强调。可迭代对象是指实现了 `__iter__` 方法的对象，而迭代器是实现了 `__iter__` 和 `__next__` 方法的对象。文档会强调 `object` 类本身并不提供 `__iter__` 和 `__next__` 方法，所以如果一个类想要成为可迭代对象或迭代器，需要自己实现这些方法。

例如，在描述 `for` 循环的工作原理时，会强调 `for` 循环实际上是调用了对象的 `__iter__` 方法来获取迭代器，然后不断调用迭代器的 `__next__` 方法来获取元素。而 `object` 类没有这些方法，所以不能直接用于 `for` 循环。

2. 关于描述符
描述符是实现了 `__get__`、`__set__` 或 `__delete__` 方法的对象。Python 文档会强调 `object` 类本身不提供这些描述符方法。如果一个类想要作为描述符使用，就必须显式地实现这些方法。

例如，在描述属性访问的机制时，会提到描述符在属性访问中的作用，同时强调 `object` 类没有描述符方法，所以不能作为描述符使用。

这些类似的强调都是为了让开发者明确，虽然 Python 有很多强大的特性和机制，但并不是所有类都天然具备这些特性，需要根据具体需求进行显式的实现。 



## 2

8.5. The `with` statement 8.5. `with` 语句 ¶

> https://docs.python.org/3/reference/compound_stmts.html#with
>
> 文档路径：python reference - Compound statements - The with statement

The [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement is used to **wrap** <u>the execution of a block</u> with <u>methods defined by a context manager</u> (see section [With Statement Context Managers](https://docs.python.org/3/reference/datamodel.html#context-managers)). This allows common [`try`](https://docs.python.org/3/reference/compound_stmts.html#try)…[`except`](https://docs.python.org/3/reference/compound_stmts.html#except)…[`finally`](https://docs.python.org/3/reference/compound_stmts.html#finally) <u>usage patterns</u> to be encapsulated for convenient reuse.
`with` 语句用于将一个代码块的执行包裹在由上下文管理器定义的方法中（见章节 具有上下文管理器的语句）。这使得常见的 `try` … `except` … `finally` 使用模式得以封装，以方便重用。[^]

```
with_stmt          ::= "with" ( "(" with_stmt_contents ","? ")" | with_stmt_contents ) ":" suite
with_stmt_contents ::= with_item ("," with_item)*
with_item          ::= expression ["as" target]
```

The execution of the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement with one “item” **proceeds** as follows:
带有一个“item”的 `with` 语句的执行过程如下：

1. The context expression (the expression given in the [`with_item`](https://docs.python.org/3/reference/compound_stmts.html#grammar-token-python-grammar-with_item)) is evaluated to obtain a context manager.
   上下文表达式（在 `with_item` 中给出的表达式）被评估以获得一个上下文管理器。

2. The context manager’s [`__enter__()`](https://docs.python.org/3/reference/datamodel.html#object.__enter__) is **loaded** for later use.

3. The context manager’s [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) is loaded for later use.

4. The context manager’s [`__enter__()`](https://docs.python.org/3/reference/datamodel.html#object.__enter__) method is **invoked**.

5. If a target was included in the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement, the return value from [`__enter__()`](https://docs.python.org/3/reference/datamodel.html#object.__enter__) is **assigned** to it.
   如果在 `with` 语句中包含了一个目标，则 `__enter__()` 的返回值将被赋值给它。

   Note
   The [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement **guarantees** that if the [`__enter__()`](https://docs.python.org/3/reference/datamodel.html#object.__enter__) method returns without an error, then [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) will always be called. Thus, if an error occurs during the assignment to <u>the target list</u>[^], it will be treated the same as an error occurring within the suite would be[^]. See step 7 below.


    `with` 语句保证如果 `__enter__()` 方法没有错误地返回，那么 `__exit__()` 将始终被调用。因此，如果在目标列表的赋值过程中发生错误，将被视为与在套件中发生错误相同。请参见下面的第 7 步。

6. The suite is executed. 套件已执行。

7. The context manager’s [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) method is invoked. 

   If an exception caused the suite to be exited, its type, value, and traceback are passed as arguments to [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__). Otherwise, three [`None`](https://docs.python.org/3/library/constants.html#None) arguments are supplied.
   如果由于异常导致套件退出，则其类型、值和回溯将作为参数传递给 `__exit__()` 。否则，将提供三个 `None` 参数。

   If the suite was exited due to an exception, and the return value from the [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) method was false, the exception is **reraised**. If the return value was true, the exception is **suppressed**, and execution continues with the statement following the [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement.
   如果套件因异常而退出，并且 `__exit__()` 方法的返回值为假，则将重新引发该异常。如果返回值为真，则将抑制异常，执行将继续在 `with` 语句之后的语句。

   If the suite was exited for any reason other than an exception, the return value from [`__exit__()`](https://docs.python.org/3/reference/datamodel.html#object.__exit__) is **ignored**, and execution proceeds at the normal location for the kind of exit that was taken.
   如果套件因除异常以外的任何原因而退出，则忽略 `__exit__()` 的返回值，执行将在正常的退出位置继续。

The following code: 以下代码：

```python
with EXPRESSION as TARGET:
    SUITE
```

is semantically equivalent to:
在语义上等价于：

```python
manager = (EXPRESSION)
enter = type(manager).__enter__
exit = type(manager).__exit__
value = enter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(manager, None, None, None)
```

With more than one item, the context managers are processed as if multiple [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statements were nested:
当有多个项目时，上下文管理器会像嵌套多个 `with` 语句一样处理：

```python
with A() as a, B() as b:
    SUITE
```

is semantically equivalent to:
在语义上等价于：

```python
with A() as a:
    with B() as b:
        SUITE
```

You can also write multi-item context managers in multiple lines if the items are surrounded by parentheses. For example:
如果项目用括号括起来，您还可以在多行中编写多项上下文管理器。例如：

```python
with (
    A() as a,
    B() as b,
):
    SUITE
```

*Changed in version 3.1:* Support for multiple context expressions.支持多个上下文表达式。

*Changed in version 3.10:* Support for using grouping parentheses to break the statement in multiple lines.支持使用分组括号将语句拆分为多行。

See also 另请参阅

- [**PEP 343**](https://peps.python.org/pep-0343/) - The “with” statement

  The specification, background, and examples for the Python [`with`](https://docs.python.org/3/reference/compound_stmts.html#with) statement.



[^]

你给出的内容属于 Python 语法的形式化描述，具体是使用巴科斯 - 诺尔范式（Backus - Naur Form，简称 BNF）或者其扩展形式来描述 Python 里 `with` 语句的语法结构。下面为你详细解读：

巴科斯 - 诺尔范式简介
巴科斯 - 诺尔范式是一种用于精确描述编程语言语法的形式化表示方法。在这种表示法里：
- 用 `::=` 表示“定义为”。
- 方括号 `[]` 表示其内部的内容是可选的。
- 圆括号 `()` 用于分组。
- `*` 表示前面的元素可以出现零次或多次。
- `,` 表示元素之间的分隔。

各部分语法解读

1. `with_stmt`
```plaintext
with_stmt ::= "with" ( "(" with_stmt_contents ","? ")" | with_stmt_contents ) ":" suite
```
- `with_stmt` 代表 `with` 语句。
- `"with"` 是关键字，表明这是一个 `with` 语句的起始。
- `( "(" with_stmt_contents ","? ")" | with_stmt_contents )` 表示有两种情况：
    - `( "(" with_stmt_contents ","? ")"`：`with_stmt_contents` 可以被圆括号包围，并且最后可以有一个可选的逗号。
    - `with_stmt_contents`：`with_stmt_contents` 也可以不被圆括号包围。
- `":"` 是语法分隔符，表明 `with` 语句的上下文管理器部分结束，后面要跟随一个代码块。
- `suite` 代表 `with` 语句所管理的代码块，也就是 `with` 语句执行时要运行的代码。

2. `with_stmt_contents`
```plaintext
with_stmt_contents ::= with_item ("," with_item)*
```
- `with_stmt_contents` 表示 `with` 语句中上下文管理器的部分。
- `with_item` 代表一个上下文管理器项。
- `("," with_item)*` 意味着可以有零个或多个由逗号分隔的 `with_item`，这表明 `with` 语句能够同时管理多个上下文管理器。

3. `with_item`
```plaintext
with_item ::= expression ["as" target]
```
- `with_item` 代表一个单独的上下文管理器项。
- `expression` 是一个表达式，其计算结果应该是一个上下文管理器对象（即实现了 `__enter__` 和 `__exit__` 方法的对象）。
- `["as" target]` 是可选的部分。如果存在，`as` 后面的 `target` 是一个变量名，上下文管理器的 `__enter__` 方法返回的值会被赋值给这个变量。

示例代码
下面是一个符合上述语法的 `with` 语句示例：
```python
with open('test.txt', 'r') as file:
    content = file.read()
    print(content)

```
在这个例子中：
- `"with"` 是关键字。
- `open('test.txt', 'r')` 是 `expression`，它返回一个文件对象，该对象是一个上下文管理器。
- `"as file"` 把文件对象的 `__enter__` 方法返回的值（也就是文件对象本身）赋值给变量 `file`。
- `content = file.read(); print(content)` 是 `suite`，即 `with` 语句管理的代码块。 



[^]

在 Python 的 `with` 语句语境中，“the target list” 指的是 `with` 语句中跟在 `as` 关键字后面的变量（或变量组）。

在 `with` 语句的语法 `with context_expression [as target(s)]:` 里，`context_expression` 是一个表达式，其结果是一个上下文管理器对象，而 `[as target(s)]` 是可选部分，`target(s)` 就是这里所说的 “target list”。

`target list` 可以是单个变量，也可以是多个变量组成的元组等形式，它的作用是接收上下文管理器的 `__enter__` 方法返回的值。

以下是一些示例来帮助理解：

**单个变量作为 target list 的情况**：

```python
class MyResource:
    def __enter__(self):
        print("Entering resource")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting resource")

    def do_something(self):
        print("Doing something with the resource")


with MyResource() as resource:  # 这里的 resource 就是 target list（单个变量）
    resource.do_something()
```

在这个例子中，`resource` 是 `target list`，它接收了 `MyResource` 类的 `__enter__` 方法返回的对象（即 `self`）。

**多个变量作为 target list 的情况（以元组形式）**：

```python
class Resource1:
    def __enter__(self):
        print("Entering Resource1")
        return "Resource1 value"

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting Resource1")


class Resource2:
    def __enter__(self):
        print("Entering Resource2")
        return "Resource2 value"

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting Resource2")


with Resource1() as r1, Resource2() as r2:  # 这里的 (r1, r2) 组成了 target list
    print(r1)
    print(r2)
```

在这个例子中，`(r1, r2)` 一起构成了 “target list”，它们分别接收了 `Resource1` 和 `Resource2` 类的 `__enter__` 方法返回的值。

所以文档中提到如果在对 “target list” 进行赋值时发生错误，会和在 `with` 语句的代码块（`suite`）中发生错误被同等对待，这是因为 `with` 语句的机制保证了只要 `__enter__` 方法无错返回，`__exit__` 方法就会被调用，无论错误是在赋值给 `target list` 时还是在 `suite` 执行过程中发生。 



[^]

整体功能
“the same as an error occurring within the suite would be” 在句子中是比较状语，用于将前面提到的 “an error occurs during the assignment to the target list”（在对目标列表赋值期间发生的错误） 和 “an error occurring within the suite”（在套件内发生的错误） 的处理方式进行对比，说明两者的处理情况是相同的。

结构剖析
- **“the same as”**：这是一个常用的比较结构，意思是“和……一样”，用于引出比较的对象。它引导一个比较状语从句，表明前后两者在某个方面具有相似性。在这个句子里，就是在说两种错误的处理方式相同。
- **“an error occurring within the suite”**：
    - “an error” 是名词短语，作从句中的主语，表示“一个错误”。
    - “occurring within the suite” 是现在分词短语作后置定语，修饰 “an error”。“occur” 是不及物动词，意为“发生”；“within the suite” 是介词短语作地点状语，说明错误发生的位置是“在套件内”。整个短语合起来就是“在套件内发生的错误”。
- **“would be”**：这是虚拟语气的表达方式，在这里表示一种假设的情况。它省略了后面的过去分词，完整形式可以理解为 “would be treated”，结合前面 “it will be treated”，整句话的意思就是在对目标列表赋值期间发生的错误的处理方式，会和在套件内发生的错误的处理方式一样。

示例助解
为了便于理解，我们看一个简单的示例：
```plaintext
The result of this experiment is the same as the result of the previous one would be.
```
在这个例句中，“the same as” 引导比较，将“this experiment”（这次实验）的结果和 “the previous one”（上一次实验）的结果进行对比，“would be” 同样是省略了内容，完整可以是 “would be obtained” ，即这次实验的结果和上一次实验可能获得的结果是一样的。

回到原句 “the same as an error occurring within the suite would be”，就是在陈述在目标列表赋值时出错的处理情况和在套件内出错的处理情况是相同的。 



## 3 未读



# PEP 343 – The “with” Statement

- Author: 作者：

  Guido van Rossum, Alyssa Coghlan

- Status: 状态：

  Final 最终版

- Type: 类型：

  Standards Track 标准轨道

- Created: 创建时间：

  13-May-2005 2005 年 5 月 13 日

- Python-Version: Python 版本：

  2.5

- Post-History: 后历史：

  02-Jun-2005, 16-Oct-2005, 29-Oct-2005, 23-Apr-2006, 01-May-2006, 30-Jul-2006 2005 年 6 月 2 日，2005 年 10 月 16 日，2005 年 10 月 29 日，2006 年 4 月 23 日，2006 年 5 月 1 日，2006 年 7 月 30 日

------

Table of Contents 目录

## [Abstract 摘要](https://peps.python.org/pep-0343/#abstract)

This PEP adds a new statement “with” to the Python language to make it possible to factor out standard uses of `try/finally` statements.
本 PEP 向 Python 语言添加了一种新语句“with”，使得可以将 `try/finally` 语句的标准用法提取出来。

In this PEP, context managers provide `__enter__()` and `__exit__()` methods that are invoked on entry to and exit from the body of the with statement.
在本 PEP 中，上下文管理器提供了 `__enter__()` 和 `__exit__()` 方法，这些方法在进入和退出 with 语句主体时被调用。

## [Author’s Note 作者的注释](https://peps.python.org/pep-0343/#author-s-note)

This PEP was originally written in first person by Guido, and subsequently updated by Alyssa (Nick) Coghlan to reflect later discussion on python-dev. Any first person references are from Guido’s original.
本 PEP 最初由 Guido 以第一人称编写，随后由 Alyssa (Nick) Coghlan 更新，以反映 python-dev 上的后续讨论。所有第一人称的引用均来自 Guido 的原始内容。

Python’s alpha release cycle revealed terminology problems in this PEP and in the associated documentation and implementation [[13\]](https://peps.python.org/pep-0343/#id29). The PEP stabilised around the time of the first Python 2.5 beta release.
Python 的 alpha 版发布周期暴露了本 PEP 及其相关文档和实现中的术语问题[13]。该 PEP 在第一个 Python 2.5 beta 版本发布时稳定下来。

Yes, the verb tense is messed up in a few places. We’ve been working on this PEP for over a year now, so things that were originally in the future are now in the past :)
是的，动词时态在某些地方确实混乱。我们已经在这个 PEP 上工作了超过一年，因此原本预期的事情现在变成了过去式 :)

## [Introduction 介绍](https://peps.python.org/pep-0343/#introduction)

After a lot of discussion about [PEP 340](https://peps.python.org/pep-0340/) and alternatives, I decided to withdraw [PEP 340](https://peps.python.org/pep-0340/) and proposed a slight variant on PEP 310. After more discussion, I have added back a mechanism for raising an exception in a suspended generator using a `throw()` method, and a `close()` method which throws a new GeneratorExit exception; these additions were first proposed on python-dev in [[2\]](https://peps.python.org/pep-0343/#id18) and universally approved of. I’m also changing the keyword to ‘with’.
在对 PEP 340 及其替代方案进行了大量讨论后，我决定撤回 PEP 340 并提出了 PEP 310 的一个略微变体。在进一步讨论后，我添加了一个机制，可以使用 `throw()` 方法在挂起的生成器中引发异常，并使用 `close()` 方法抛出一个新的 GeneratorExit 异常；这些补充最初在 python-dev 上提出，并得到了普遍认可。我还将关键字更改为“with”。

After acceptance of this PEP, the following PEPs were rejected due to overlap:
在接受该 PEP 后，以下 PEP 由于重叠而被拒绝：

- [PEP 310](https://peps.python.org/pep-0310/), Reliable Acquisition/Release Pairs. This is the original with-statement proposal.
  PEP 310，可靠的获取/释放对。这是原始的 with 语句提案。
- [PEP 319](https://peps.python.org/pep-0319/), Python Synchronize/Asynchronize Block. Its use cases can be covered by the current PEP by providing suitable with-statement controllers: for ‘synchronize’ we can use the “locking” template from example 1; for ‘asynchronize’ we can use a similar “unlocking” template. I don’t think having an “anonymous” lock associated with a code block is all that important; in fact it may be better to always be explicit about the mutex being used.
  PEP 319，Python 同步/异步块。它的用例可以通过当前 PEP 提供合适的 with 语句控制器来覆盖：对于“同步”，我们可以使用示例 1 中的“锁定”模板；对于“异步”，我们可以使用类似的“解锁”模板。我认为将一个“匿名”锁与代码块关联并不是特别重要；事实上，始终明确使用的互斥量可能更好。

[PEP 340](https://peps.python.org/pep-0340/) and [PEP 346](https://peps.python.org/pep-0346/) also overlapped with this PEP, but were voluntarily withdrawn when this PEP was submitted.
PEP 340 和 PEP 346 也与该 PEP 重叠，但在提交该 PEP 时自愿撤回。

Some discussion of earlier incarnations of this PEP took place on the Python Wiki [[3\]](https://peps.python.org/pep-0343/#id19).
该 PEP 早期版本的一些讨论发生在 Python Wiki 上。

## [Motivation and Summary 动机和摘要](https://peps.python.org/pep-0343/#motivation-and-summary)

[PEP 340](https://peps.python.org/pep-0340/), Anonymous Block Statements, combined many powerful ideas: using generators as block templates, adding exception handling and finalization to generators, and more. Besides praise it received a lot of opposition from people who didn’t like the fact that it was, under the covers, a (potential) looping construct. This meant that break and continue in a block-statement would break or continue the block-statement, even if it was used as a non-looping resource management tool.
PEP 340，匿名块语句，结合了许多强大的思想：使用生成器作为块模板，为生成器添加异常处理和最终化等。此外，它受到了许多反对的声音，因为人们不喜欢它在底层是一个（潜在的）循环结构。这意味着在块语句中的 break 和 continue 会中断或继续块语句，即使它被用作非循环的资源管理工具。

But the final blow came when I read Raymond Chen’s rant about flow-control macros [[1\]](https://peps.python.org/pep-0343/#id17). Raymond argues convincingly that hiding flow control in macros makes your code inscrutable, and I find that his argument applies to Python as well as to C. I realized that [PEP 340](https://peps.python.org/pep-0340/) templates can hide all sorts of control flow; for example, its example 4 (`auto_retry()`) catches exceptions and repeats the block up to three times.
但是，当我阅读了雷蒙德·陈关于流控制宏的评论时，最后一击到来了[1]。雷蒙德有力地论证了在宏中隐藏流控制使得代码难以理解，而我发现他的论点同样适用于 Python 和 C。我意识到 PEP 340 模板可以隐藏各种控制流；例如，它的例子 4 ( `auto_retry()` ) 捕获异常，并将块重复最多三次。

However, the with-statement of [PEP 310](https://peps.python.org/pep-0310/) does **not** hide control flow, in my view: while a finally-suite temporarily suspends the control flow, in the end, the control flow resumes as if the finally-suite wasn’t there at all.
然而，PEP 310 的 with 语句在我看来并没有隐藏控制流：虽然 finally 语句会暂时暂停控制流，但最终控制流会恢复，就像 finally 语句根本不存在一样。

Remember, [PEP 310](https://peps.python.org/pep-0310/) proposes roughly this syntax (the “VAR =” part is optional):
记住，PEP 310 大致建议使用以下语法（“VAR =”部分是可选的）：

```
with VAR = EXPR:
    BLOCK
```

which roughly translates into this:
这大致翻译为：

```
VAR = EXPR
VAR.__enter__()
try:
    BLOCK
finally:
    VAR.__exit__()
```

Now consider this example:
现在考虑这个例子：

```
with f = open("/etc/passwd"):
    BLOCK1
BLOCK2
```

Here, just as if the first line was “if True” instead, we know that if `BLOCK1` completes without an exception, BLOCK2 will be reached; and if `BLOCK1` raises an exception or executes a non-local goto (a break, continue or return), `BLOCK2` is **not** reached. The magic added by the with-statement at the end doesn’t affect this.
在这里，就像第一行是“if True”一样，我们知道如果 `BLOCK1` 在没有异常的情况下完成，将会到达 BLOCK2；如果 `BLOCK1` 引发异常或执行非本地跳转（如 break、continue 或 return），则 `BLOCK2` 不会被到达。末尾的 with 语句所添加的魔法并不会影响这一点。

(You may ask, what if a bug in the `__exit__()` method causes an exception? Then all is lost – but this is no worse than with other exceptions; the nature of exceptions is that they can happen **anywhere**, and you just have to live with that. Even if you write bug-free code, a KeyboardInterrupt exception can still cause it to exit between any two virtual machine opcodes.)
（你可能会问，如果 `__exit__()` 方法中的一个错误导致了异常怎么办？那一切都失去了——但这并不比其他异常更糟糕；异常的本质在于它们可以在任何地方发生，而你只能接受这一点。即使你编写了无错误的代码，KeyboardInterrupt 异常仍然可以在两个虚拟机操作码之间导致其退出。）

This argument almost led me to endorse [PEP 310](https://peps.python.org/pep-0310/), but I had one idea left from the [PEP 340](https://peps.python.org/pep-0340/) euphoria that I wasn’t ready to drop: using generators as “templates” for abstractions like acquiring and releasing a lock or opening and closing a file is a powerful idea, as can be seen by looking at the examples in that PEP.
这个论点几乎让我支持 PEP 310，但我仍然有一个来自 PEP 340 狂热期的想法，我还没有准备好放弃：将生成器作为获取和释放锁或打开和关闭文件等抽象的“模板”使用是一个强大的想法，正如查看该 PEP 中的示例所示。

Inspired by a counter-proposal to [PEP 340](https://peps.python.org/pep-0340/) by Phillip Eby I tried to create a decorator that would turn a suitable generator into an object with the necessary `__enter__()` and `__exit__()` methods. Here I ran into a snag: while it wasn’t too hard for the locking example, it was impossible to do this for the opening example. The idea was to define the template like this:
受到 Phillip Eby 对 PEP 340 的反提案的启发，我尝试创建一个装饰器，将一个合适的生成器转换为具有必要 `__enter__()` 和 `__exit__()` 方法的对象。在这里，我遇到了一个障碍：虽然对锁定示例来说并不算太难，但对打开示例来说是不可能的。这个想法是这样定义模板：

```
@contextmanager
def opening(filename):
    f = open(filename)
    try:
        yield f
    finally:
        f.close()
```

and used it like this:
并像这样使用：

```
with f = opening(filename):
    ...read data from f...
```

The problem is that in [PEP 310](https://peps.python.org/pep-0310/), the result of calling `EXPR` is assigned directly to `VAR`, and then `VAR`’s `__exit__()` method is called upon exit from `BLOCK1`. But here, `VAR` clearly needs to receive the opened file, and that would mean that `__exit__()` would have to be a method on the file.
问题在于，在 PEP 310 中，调用 `EXPR` 的结果直接赋值给 `VAR` ，然后在从 `BLOCK1` 退出时调用 `VAR` 的 `__exit__()` 方法。但在这里， `VAR` 显然需要接收已打开的文件，这意味着 `__exit__()` 必须成为文件上的一个方法。

While this can be solved using a proxy class, this is awkward and made me realize that a slightly different translation would make writing the desired decorator a piece of cake: let `VAR` receive the result from calling the `__enter__()` method, and save the value of `EXPR` to call its `__exit__()` method later. Then the decorator can return an instance of a wrapper class whose `__enter__()` method calls the generator’s `next()` method and returns whatever `next()` returns; the wrapper instance’s `__exit__()` method calls `next()` again but expects it to raise StopIteration. (Details below in the section Optional Generator Decorator.)
虽然这可以通过使用代理类来解决，但这很尴尬，并让我意识到稍微不同的翻译会让编写所需的装饰器变得轻而易举：让 `VAR` 接收调用 `__enter__()` 方法的结果，并将 `EXPR` 的值保存起来以便稍后调用其 `__exit__()` 方法。然后，装饰器可以返回一个包装器类的实例，其 `__enter__()` 方法调用生成器的 `next()` 方法并返回 `next()` 返回的内容；包装器实例的 `__exit__()` 方法再次调用 `next()` ，但期望它引发 StopIteration。（详细信息见可选生成器装饰器部分。）

So now the final hurdle was that the [PEP 310](https://peps.python.org/pep-0310/) syntax:
所以现在最后的障碍是 PEP 310 语法：

```
with VAR = EXPR:
    BLOCK1
```

would be deceptive, since `VAR` does **not** receive the value of `EXPR`. Borrowing from [PEP 340](https://peps.python.org/pep-0340/), it was an easy step to:
会具有欺骗性，因为 `VAR` 不会接收到 `EXPR` 的值。借鉴 PEP 340，很容易做到：

```
with EXPR as VAR:
    BLOCK1
```

Additional discussion showed that people really liked being able to “see” the exception in the generator, even if it was only to log it; the generator is not allowed to yield another value, since the with-statement should not be usable as a loop (raising a different exception is marginally acceptable). To enable this, a new `throw()` method for generators is proposed, which takes one to three arguments representing an exception in the usual fashion (type, value, traceback) and raises it at the point where the generator is suspended.
进一步的讨论表明，人们真的很喜欢能够在生成器中“看到”异常，即使只是为了记录它；生成器不允许产生另一个值，因为 with 语句不应该用作循环（引发不同的异常是勉强可以接受的）。为了实现这一点，建议为生成器添加一个新的 `throw()` 方法，该方法接受一到三个参数，以通常的方式表示异常（类型、值、回溯），并在生成器暂停的地方引发它。

Once we have this, it is a small step to proposing another generator method, `close()`, which calls `throw()` with a special exception, `GeneratorExit`. This tells the generator to exit, and from there it’s another small step to proposing that `close()` be called automatically when the generator is garbage-collected.
一旦我们有了这个，提出另一种生成器方法 `close()` 就是小事一桩，它以特殊异常 `throw()` 调用 `GeneratorExit` 。这告诉生成器退出，从这里开始，提出在生成器被垃圾回收时自动调用 `close()` 也是小事一桩。

Then, finally, we can allow a yield-statement inside a try-finally statement, since we can now guarantee that the finally-clause will (eventually) be executed. The usual cautions about finalization apply – the process may be terminated abruptly without finalizing any objects, and objects may be kept alive forever by cycles or memory leaks in the application (as opposed to cycles or leaks in the Python implementation, which are taken care of by GC).
然后，最后，我们可以允许在 try-finally 语句内使用 yield 语句，因为我们现在可以保证 finally 子句会（最终）被执行。关于最终化的常规警告依然适用——进程可能会在没有最终化任何对象的情况下被突然终止，并且对象可能会因为应用程序中的循环或内存泄漏而永远存活（与在 Python 实现中的循环或泄漏不同，后者由 GC 处理）。

Note that we’re not guaranteeing that the finally-clause is executed immediately after the generator object becomes unused, even though this is how it will work in CPython. This is similar to auto-closing files: while a reference-counting implementation like CPython deallocates an object as soon as the last reference to it goes away, implementations that use other GC algorithms do not make the same guarantee. This applies to Jython, IronPython, and probably to Python running on Parrot.
请注意，我们并不保证 finally 子句在生成器对象变得未被使用后立即执行，尽管在 CPython 中确实是这样工作。这类似于自动关闭文件：虽然像 CPython 这样的引用计数实现会在最后一个引用消失后立即释放对象，但使用其他 GC 算法的实现并不提供相同的保证。这适用于 Jython、IronPython，可能还包括在 Parrot 上运行的 Python。

(The details of the changes made to generators can now be found in [PEP 342](https://peps.python.org/pep-0342/) rather than in the current PEP)
（对生成器所做更改的详细信息现在可以在 PEP 342 中找到，而不是在当前的 PEP 中）

## [Use Cases 用例](https://peps.python.org/pep-0343/#use-cases)

See the Examples section near the end.
请参见最后部分的示例部分。

## [Specification: The ‘with’ Statement 规范：‘with’语句](https://peps.python.org/pep-0343/#specification-the-with-statement)

A new statement is proposed with the syntax:
提出了一个新语句，其语法为：

```
with EXPR as VAR:
    BLOCK
```

Here, ‘with’ and ‘as’ are new keywords; `EXPR` is an arbitrary expression (but not an expression-list) and `VAR` is a single assignment target. It can **not** be a comma-separated sequence of variables, but it **can** be a **parenthesized** comma-separated sequence of variables. (This restriction makes a future extension possible of the syntax to have multiple comma-separated resources, each with its own optional as-clause.)
在这里，‘with’ 和 ‘as’ 是新的关键字； `EXPR` 是一个任意表达式（但不是表达式列表）， `VAR` 是一个单一的赋值目标。它不能是一个用逗号分隔的变量序列，但可以是一个用括号括起来的逗号分隔的变量序列。（这个限制使得将来语法扩展为多个用逗号分隔的资源成为可能，每个资源都有它自己可选的 as 子句。）

The “as VAR” part is optional.
“as VAR” 部分是可选的。

The translation of the above statement is:
上述语句的翻译是：

```
mgr = (EXPR)
exit = type(mgr).__exit__  # Not calling it yet
value = type(mgr).__enter__(mgr)
exc = True
try:
    try:
        VAR = value  # Only if "as VAR" is present
        BLOCK
    except:
        # The exceptional case is handled here
        exc = False
        if not exit(mgr, *sys.exc_info()):
            raise
        # The exception is swallowed if exit() returns true
finally:
    # The normal and non-local-goto cases are handled here
    if exc:
        exit(mgr, None, None, None)
```

Here, the lowercase variables (mgr, exit, value, exc) are internal variables and not accessible to the user; they will most likely be implemented as special registers or stack positions.
在这里，小写变量（mgr、exit、value、exc）是内部变量，用户无法访问；它们很可能作为特殊寄存器或栈位置实现。

The details of the above translation are intended to prescribe the exact semantics. If either of the relevant methods are not found as expected, the interpreter will raise `AttributeError`, in the order that they are tried (`__exit__`, `__enter__`). Similarly, if any of the calls raises an exception, the effect is exactly as it would be in the above code. Finally, if `BLOCK` contains a break, continue or return statement, the `__exit__()` method is called with three None arguments just as if `BLOCK` completed normally. (I.e. these “pseudo-exceptions” are not seen as exceptions by `__exit__()`.)
上述翻译的细节旨在规定确切的语义。如果未能按预期找到相关方法，解释器将按照尝试的顺序引发 `AttributeError` （ `__exit__` ， `__enter__` ）。类似地，如果任何调用引发异常，效果正如在上述代码中一样。最后，如果 `BLOCK` 包含 break、continue 或 return 语句，则 `__exit__()` 方法将使用三个 None 参数被调用，就像 `BLOCK` 正常完成一样。（即，这些“伪异常”在 `__exit__()` 中不被视为异常。）

If the “as VAR” part of the syntax is omitted, the “VAR =” part of the translation is omitted (but `mgr.__enter__()` is still called).
如果省略语法中的 “as VAR” 部分，则省略翻译中的 “VAR =” 部分（但仍然调用 `mgr.__enter__()` ）。

The calling convention for `mgr.__exit__()` is as follows. If the finally-suite was reached through normal completion of `BLOCK` or through a non-local goto (a break, continue or return statement in `BLOCK`), `mgr.__exit__()` is called with three `None` arguments. If the finally-suite was reached through an exception raised in `BLOCK`, `mgr.__exit__()` is called with three arguments representing the exception type, value, and traceback.
`mgr.__exit__()` 的调用约定如下。如果通过 `BLOCK` 的正常完成或通过非局部跳转（在 `BLOCK` 中的 break、continue 或 return 语句）到达 finally 块，则使用三个 `None` 参数调用 `mgr.__exit__()` 。如果通过在 `BLOCK` 中引发的异常到达 finally 块，则使用三个表示异常类型、值和追踪的参数调用 `mgr.__exit__()` 。

IMPORTANT: if `mgr.__exit__()` returns a “true” value, the exception is “swallowed”. That is, if it returns “true”, execution continues at the next statement after the with-statement, even if an exception happened inside the with-statement. However, if the with-statement was left via a non-local goto (break, continue or return), this non-local return is resumed when `mgr.__exit__()` returns regardless of the return value. The motivation for this detail is to make it possible for `mgr.__exit__()` to swallow exceptions, without making it too easy (since the default return value, `None`, is false and this causes the exception to be re-raised). The main use case for swallowing exceptions is to make it possible to write the `@contextmanager` decorator so that a try/except block in a decorated generator behaves exactly as if the body of the generator were expanded in-line at the place of the with-statement.
重要：如果 `mgr.__exit__()` 返回“真”值，则异常被“吞掉”。也就是说，如果它返回“真”，则在 with 语句之后的下一条语句处继续执行，即使在 with 语句内部发生了异常。然而，如果通过非局部跳转（break、continue 或 return）离开 with 语句，则当 `mgr.__exit__()` 返回时，将恢复该非局部返回，返回值无关。此细节的动机是使 `mgr.__exit__()` 能够吞掉异常，而不会使其太容易（因为默认返回值 `None` 是假，这会导致异常被重新引发）。吞掉异常的主要用例是为了使得可以编写 `@contextmanager` 装饰器，以便在装饰生成器中的 try/except 块的行为完全与生成器主体在 with 语句处扩展成行内的情况相同。

The motivation for passing the exception details to `__exit__()`, as opposed to the argument-less `__exit__()` from [PEP 310](https://peps.python.org/pep-0310/), was given by the `transactional()` use case, example 3 below. The template in that example must commit or roll back the transaction depending on whether an exception occurred or not. Rather than just having a boolean flag indicating whether an exception occurred, we pass the complete exception information, for the benefit of an exception-logging facility for example. Relying on `sys.exc_info()` to get at the exception information was rejected; `sys.exc_info()` has very complex semantics and it is perfectly possible that it returns the exception information for an exception that was caught ages ago. It was also proposed to add an additional boolean to distinguish between reaching the end of `BLOCK` and a non-local goto. This was rejected as too complex and unnecessary; a non-local goto should be considered unexceptional for the purposes of a database transaction roll-back decision.
将异常详细信息传递给 `__exit__()` 的动机，与 PEP 310 中无参数的 `__exit__()` 相对，是由 `transactional()` 使用案例提供的，下面是示例 3。在该示例中，模板必须根据是否发生异常来提交或回滚事务。我们不仅仅使用一个布尔标志来指示是否发生异常，而是传递完整的异常信息，例如为了异常日志记录的便利性。依赖 `sys.exc_info()` 来获取异常信息被拒绝； `sys.exc_info()` 的语义非常复杂，完全有可能返回一个很久以前捕获的异常的信息。还提议添加一个额外的布尔值，以区分到达 {{5 }} 末尾和非局部跳转。这被拒绝，因为过于复杂且不必要；在数据库事务回滚决策中，非局部跳转应被视为不例外情况。

To facilitate chaining of contexts in Python code that directly manipulates context managers, `__exit__()` methods should **not** re-raise the error that is passed in to them. It is always the responsibility of the **caller** of the `__exit__()` method to do any reraising in that case.
为了便于在直接操作上下文管理器的 Python 代码中链式调用上下文， `__exit__()` 方法不应该重新抛出传递给它们的错误。在这种情况下，始终由 `__exit__()` 方法的调用者负责进行任何重新抛出。

That way, if the caller needs to tell whether the `__exit__()` invocation **failed** (as opposed to successfully cleaning up before propagating the original error), it can do so.
这样，如果调用者需要判断 `__exit__()` 调用是否失败（与成功清理后传播原始错误相对），它可以做到这一点。

If `__exit__()` returns without an error, this can then be interpreted as success of the `__exit__()` method itself (regardless of whether or not the original error is to be propagated or suppressed).
如果 `__exit__()` 在没有错误的情况下返回，则可以将其解释为 `__exit__()` 方法本身的成功（无论原始错误是否要被传播或抑制）。

However, if `__exit__()` propagates an exception to its caller, this means that `__exit__()` **itself** has failed. Thus, `__exit__()` methods should avoid raising errors unless they have actually failed. (And allowing the original error to proceed isn’t a failure.)
然而，如果 `__exit__()` 向其调用者传播了异常，这意味着 `__exit__()` 本身已经失败。因此， `__exit__()` 方法应避免抛出错误，除非它们确实失败了。（并且允许原始错误继续并不是失败。）

## [Transition Plan 过渡计划](https://peps.python.org/pep-0343/#transition-plan)

In Python 2.5, the new syntax will only be recognized if a future statement is present:
在 Python 2.5 中，只有在存在未来语句时，新语法才会被识别：

```
from __future__ import with_statement
```

This will make both ‘with’ and ‘as’ keywords. Without the future statement, using ‘with’ or ‘as’ as an identifier will cause a Warning to be issued to stderr.
这将使得‘with’和‘as’成为关键字。如果没有未来语句，将‘with’或‘as’用作标识符将导致向 stderr 发出警告。

In Python 2.6, the new syntax will always be recognized; ‘with’ and ‘as’ are always keywords.
在 Python 2.6 中，新语法将始终被识别；‘with’和‘as’始终是关键字。

## [Generator Decorator 生成器装饰器](https://peps.python.org/pep-0343/#generator-decorator)

With [PEP 342](https://peps.python.org/pep-0342/) accepted, it is possible to write a decorator that makes it possible to use a generator that yields exactly once to control a with-statement. Here’s a sketch of such a decorator:
随着 PEP 342 的接受，可以编写一个装饰器，使得能够使用精确一次生成的生成器控制 with 语句。以下是这种装饰器的一个草图：

```
class GeneratorContextManager(object):

   def __init__(self, gen):
       self.gen = gen

   def __enter__(self):
       try:
           return self.gen.next()
       except StopIteration:
           raise RuntimeError("generator didn't yield")

   def __exit__(self, type, value, traceback):
       if type is None:
           try:
               self.gen.next()
           except StopIteration:
               return
           else:
               raise RuntimeError("generator didn't stop")
       else:
           try:
               self.gen.throw(type, value, traceback)
               raise RuntimeError("generator didn't stop after throw()")
           except StopIteration:
               return True
           except:
               # only re-raise if it's *not* the exception that was
               # passed to throw(), because __exit__() must not raise
               # an exception unless __exit__() itself failed.  But
               # throw() has to raise the exception to signal
               # propagation, so this fixes the impedance mismatch
               # between the throw() protocol and the __exit__()
               # protocol.
               #
               if sys.exc_info()[1] is not value:
                   raise

def contextmanager(func):
   def helper(*args, **kwds):
       return GeneratorContextManager(func(*args, **kwds))
   return helper
```

This decorator could be used as follows:
此装饰器可以如下使用：

```
@contextmanager
def opening(filename):
   f = open(filename) # IOError is untouched by GeneratorContext
   try:
       yield f
   finally:
       f.close() # Ditto for errors here (however unlikely)
```

A robust implementation of this decorator will be made part of the standard library.
这个装饰器的强大实现将成为标准库的一部分。

## [Context Managers in the Standard Library 标准库中的上下文管理器](https://peps.python.org/pep-0343/#context-managers-in-the-standard-library)

It would be possible to endow certain objects, like files, sockets, and locks, with `__enter__()` and `__exit__()` methods so that instead of writing:
可以赋予某些对象，如文件、套接字和锁， `__enter__()` 和 `__exit__()` 方法，这样就可以不必写：

```
with locking(myLock):
    BLOCK
```

one could write simply:
可以简单地写：

```
with myLock:
    BLOCK
```

I think we should be careful with this; it could lead to mistakes like:
我认为我们应该对此保持谨慎；这可能会导致错误，例如：

```
f = open(filename)
with f:
    BLOCK1
with f:
    BLOCK2
```

which does not do what one might think (f is closed before `BLOCK2` is entered).
这并不符合一个人可能想到的（f 在 `BLOCK2` 输入之前是关闭的）。

OTOH such mistakes are easily diagnosed; for example, the generator context decorator above raises `RuntimeError` when a second with-statement calls `f.__enter__()` again. A similar error can be raised if `__enter__` is invoked on a closed file object.
另一方面，这种错误很容易诊断；例如，上面的生成器上下文装饰器在第二个 with 语句再次调用 `f.__enter__()` 时会引发 `RuntimeError` 。如果在关闭的文件对象上调用 `__enter__` ，也可能会引发类似的错误。

For Python 2.5, the following types have been identified as context managers:
对于 Python 2.5，以下类型被确定为上下文管理器：

```
- file
- thread.LockType
- threading.Lock
- threading.RLock
- threading.Condition
- threading.Semaphore
- threading.BoundedSemaphore
```

A context manager will also be added to the decimal module to support using a local decimal arithmetic context within the body of a with statement, automatically restoring the original context when the with statement is exited.
还将在十进制模块中添加一个上下文管理器，以支持在 with 语句的主体内使用本地十进制算术上下文，自动在退出 with 语句时恢复原始上下文。

## [Standard Terminology 标准术语](https://peps.python.org/pep-0343/#standard-terminology)

This PEP proposes that the protocol consisting of the `__enter__()` and `__exit__()` methods be known as the “context management protocol”, and that objects that implement that protocol be known as “context managers”. [[4\]](https://peps.python.org/pep-0343/#id20)
该 PEP 提议将包含 `__enter__()` 和 `__exit__()` 方法的协议称为“上下文管理协议”，并将实现该协议的对象称为“上下文管理器”。[4]

The expression immediately following the with keyword in the statement is a “context expression” as that expression provides the main clue as to the runtime environment the context manager establishes for the duration of the statement body.
语句中紧跟在 with 关键字之后的表达式是“上下文表达式”，因为该表达式提供了关于上下文管理器在语句主体执行期间建立的运行时环境的主要线索。

The code in the body of the with statement and the variable name (or names) after the as keyword don’t really have special terms at this point in time. The general terms “statement body” and “target list” can be used, prefixing with “with” or “with statement” if the terms would otherwise be unclear.
with 语句主体中的代码和 as 关键字后面的变量名（或名称）在此时并没有特别的术语。可以使用一般术语“语句主体”和“目标列表”，如果术语不明确，可以加上“with”或“with 语句”作为前缀。

Given the existence of objects such as the decimal module’s arithmetic context, the term “context” is unfortunately ambiguous. If necessary, it can be made more specific by using the terms “context manager” for the concrete object created by the context expression and “runtime context” or (preferably) “runtime environment” for the actual state modifications made by the context manager. When simply discussing use of the with statement, the ambiguity shouldn’t matter too much as the context expression fully defines the changes made to the runtime environment. The distinction is more important when discussing the mechanics of the with statement itself and how to go about actually implementing context managers.
鉴于诸如 decimal 模块的算术上下文等对象的存在，“上下文”这一术语不幸地具有歧义性。如有必要，可以通过使用“上下文管理器”来指代由上下文表达式创建的具体对象，以及使用“运行时上下文”或（更可取地）“运行时环境”来指代上下文管理器实际进行的状态修改，从而使其更加明确。在仅讨论 with 语句的使用时，这种歧义性不应造成太大影响，因为上下文表达式完全定义了对运行时环境的更改。然而，在讨论 with 语句本身的机制以及如何实际实现上下文管理器时，这种区分就显得更为重要了。

## [Caching Context Managers 缓存上下文管理器](https://peps.python.org/pep-0343/#caching-context-managers)

Many context managers (such as files and generator-based contexts) will be single-use objects. Once the `__exit__()` method has been called, the context manager will no longer be in a usable state (e.g. the file has been closed, or the underlying generator has finished execution).
许多上下文管理器（如文件和基于生成器的上下文）将是一次性对象。一旦调用了 `__exit__()` 方法，该上下文管理器将不再处于可用状态（例如，文件已被关闭，或者基础生成器已完成执行）。

Requiring a fresh manager object for each with statement is the easiest way to avoid problems with multi-threaded code and nested with statements trying to use the same context manager. It isn’t coincidental that all of the standard library context managers that support reuse come from the threading module - they’re all already designed to deal with the problems created by threaded and nested usage.
为每个 with 语句要求一个全新的管理器对象是避免多线程代码和嵌套 with 语句的问题的最简单方法，这些语句尝试使用相同的上下文管理器。所有支持重用的标准库上下文管理器都来自 threading 模块并不是巧合——它们已经设计为处理由线程和嵌套使用所产生的问题。

This means that in order to save a context manager with particular initialisation arguments to be used in multiple with statements, it will typically be necessary to store it in a zero-argument callable that is then called in the context expression of each statement rather than caching the context manager directly.
这意味着为了保存一个具有特定初始化参数的上下文管理器以在多个 with 语句中使用，通常需要将其存储在一个零参数的可调用对象中，然后在每个语句的上下文表达式中调用它，而不是直接缓存上下文管理器。

When this restriction does not apply, the documentation of the affected context manager should make that clear.
当此限制不适用时，受影响的上下文管理器的文档应明确说明这一点。

## [Resolved Issues 已解决的问题](https://peps.python.org/pep-0343/#resolved-issues)

The following issues were resolved by BDFL approval (and a lack of any major objections on python-dev).
以下问题通过 BDFL 的批准得到解决（以及在 python-dev 上没有任何重大异议）。

1. What exception should

    

   ```
   GeneratorContextManager
   ```

    

   raise when the underlying generator-iterator misbehaves? The following quote is the reason behind Guido’s choice of

    

   ```
   RuntimeError
   ```

    

   for both this and for the generator

    

   ```
   close()
   ```

    

   method in

    

   PEP 342

    

   (from

    

   [8]

   ):

   
   当底层生成器迭代器行为不当时， `GeneratorContextManager` 应该引发什么异常？以下引用是桂多选择 `RuntimeError` 的原因，既适用于此，也适用于 PEP 342 中的生成器 `close()` 方法（来自 [8]）：

   “I’d rather not introduce a new exception class just for this purpose, since it’s not an exception that I want people to catch: I want it to turn into a traceback which is seen by the programmer who then fixes the code. So now I believe they should both raise `RuntimeError`. There are some precedents for that: it’s raised by the core Python code in situations where endless recursion is detected, and for uninitialized objects (and for a variety of miscellaneous conditions).”
   “我不想仅仅为这个目的引入一个新的异常类，因为这不是我希望人们捕获的异常：我希望它变成一个回溯，供程序员看到，然后修复代码。所以现在我认为它们都应该引发 `RuntimeError` 。这方面有一些先例：在检测到无限递归和未初始化对象（以及各种其他杂项条件）时，核心 Python 代码会引发它。”

2. It is fine to raise `AttributeError` instead of `TypeError` if the relevant methods aren’t present on a class involved in a with statement. The fact that the abstract object C API raises `TypeError` rather than `AttributeError` is an accident of history, rather than a deliberate design decision [[11\]](https://peps.python.org/pep-0343/#id27).
   如果在涉及 with 语句的类中缺少相关方法，抛出 `AttributeError` 而不是 `TypeError` 是可以的。抽象对象 C API 抛出 `TypeError` 而不是 `AttributeError` 是历史的意外，而不是一个故意的设计决策 [11]。

3. Objects with `__enter__/__exit__` methods are called “context managers” and the decorator to convert a generator function into a context manager factory is `contextlib.contextmanager`. There were some other suggestions [[15\]](https://peps.python.org/pep-0343/#id31) during the 2.5 release cycle but no compelling arguments for switching away from the terms that had been used in the PEP implementation were made.
   具有 `__enter__/__exit__` 方法的对象称为“上下文管理器”，将生成器函数转换为上下文管理器工厂的装饰器是 `contextlib.contextmanager` 。在 2.5 发布周期期间还有一些其他建议 [15]，但没有令人信服的理由来放弃在 PEP 实现中使用的术语。

## [Rejected Options 被拒绝的选项](https://peps.python.org/pep-0343/#rejected-options)

For several months, the PEP prohibited suppression of exceptions in order to avoid hidden flow control. Implementation revealed this to be a right royal pain, so Guido restored the ability [[12\]](https://peps.python.org/pep-0343/#id28).
几个月以来，PEP 禁止抑制异常以避免隐藏的控制流。实施证明这是一件非常麻烦的事情，因此 Guido 恢复了这一能力 [12]。

Another aspect of the PEP that caused no end of questions and terminology debates was providing a `__context__()` method that was analogous to an iterable’s `__iter__()` method [[5\]](https://peps.python.org/pep-0343/#id21) [[7\]](https://peps.python.org/pep-0343/#id23) [[9\]](https://peps.python.org/pep-0343/#id25). The ongoing problems [[10\]](https://peps.python.org/pep-0343/#id26) [[12\]](https://peps.python.org/pep-0343/#id28) with explaining what it was and why it was and how it was meant to work eventually lead to Guido killing the concept outright [[14\]](https://peps.python.org/pep-0343/#id30) (and there was much rejoicing!).
PEP 的另一个引发无尽问题和术语辩论的方面是提供一个与可迭代对象的 `__iter__()` 方法类似的 `__context__()` 方法[5][7][9]。有关它是什么、为什么是它以及它应该如何工作的持续问题[10][12]最终导致 Guido 直接否定了这个概念[14]（人们非常高兴！）。

The notion of using the [PEP 342](https://peps.python.org/pep-0342/) generator API directly to define the with statement was also briefly entertained [[6\]](https://peps.python.org/pep-0343/#id22), but quickly dismissed as making it too difficult to write non-generator based context managers.
直接使用 PEP 342 生成器 API 来定义 with 语句的概念也曾被简要考虑过[6]，但很快被驳回，因为这使得编写非生成器基础的上下文管理器变得过于困难。

## [Examples 示例](https://peps.python.org/pep-0343/#examples)

The generator based examples rely on [PEP 342](https://peps.python.org/pep-0342/). Also, some of the examples are unnecessary in practice, as the appropriate objects, such as `threading.RLock`, are able to be used directly in with statements.
基于生成器的示例依赖于 PEP 342。此外，一些示例在实践中是不必要的，因为适当的对象，例如 `threading.RLock` ，可以直接在 with 语句中使用。

The tense used in the names of the example contexts is not arbitrary. Past tense (“-ed”) is used when the name refers to an action which is done in the `__enter__` method and undone in the `__exit__` method. Progressive tense (“-ing”) is used when the name refers to an action which is to be done in the `__exit__` method.
示例上下文名称中使用的时态并非随意。当名称指代在 `__enter__` 方法中完成并在 `__exit__` 方法中撤销的动作时，使用过去时（“-ed”）。当名称指代将在 `__exit__` 方法中完成的动作时，使用进行时（“-ing”）。

1. A template for ensuring that a lock, acquired at the start of a block, is released when the block is left:

   
   确保在块开始时获取的锁在离开块时释放的模板：

   ```
   @contextmanager
   def locked(lock):
       lock.acquire()
       try:
           yield
       finally:
           lock.release()
   ```

   Used as follows: 用法如下：

   ```
   with locked(myLock):
       # Code here executes with myLock held.  The lock is
       # guaranteed to be released when the block is left (even
       # if via return or by an uncaught exception).
   ```

2. A template for opening a file that ensures the file is closed when the block is left:

   
   确保在离开块时关闭文件的打开文件模板：

   ```
   @contextmanager
   def opened(filename, mode="r"):
       f = open(filename, mode)
       try:
           yield f
       finally:
           f.close()
   ```

   Used as follows: 用法如下：

   ```
   with opened("/etc/passwd") as f:
       for line in f:
           print line.rstrip()
   ```

3. A template for committing or rolling back a database transaction:

   
   提交或回滚数据库事务的模板：

   ```
   @contextmanager
   def transaction(db):
       db.begin()
       try:
           yield None
       except:
           db.rollback()
           raise
       else:
           db.commit()
   ```

4. Example 1 rewritten without a generator:

   
   示例 1 重写为没有生成器的版本：

   ```
   class locked:
      def __init__(self, lock):
          self.lock = lock
      def __enter__(self):
          self.lock.acquire()
      def __exit__(self, type, value, tb):
          self.lock.release()
   ```

   (This example is easily modified to implement the other relatively stateless examples; it shows that it is easy to avoid the need for a generator if no special state needs to be preserved.)
   （这个示例很容易修改以实现其他相对无状态的示例；它表明如果不需要保留特殊状态，则可以轻松避免使用生成器。）

5. Redirect stdout temporarily:

   
   临时重定向 stdout：

   ```
   @contextmanager
   def stdout_redirected(new_stdout):
       save_stdout = sys.stdout
       sys.stdout = new_stdout
       try:
           yield None
       finally:
           sys.stdout = save_stdout
   ```

   Used as follows: 用法如下：

   ```
   with opened(filename, "w") as f:
       with stdout_redirected(f):
           print "Hello world"
   ```

   This isn’t thread-safe, of course, but neither is doing this same dance manually. In single-threaded programs (for example, in scripts) it is a popular way of doing things.
   当然这不是线程安全的，但手动做同样的事情也不是线程安全的。在单线程程序中（例如，在脚本中），这是一个常见的做法。

6. A variant on

    

   ```
   opened()
   ```

    

   that also returns an error condition:

   
   `opened()` 的一个变体，它还返回一个错误条件：

   ```
   @contextmanager
   def opened_w_error(filename, mode="r"):
       try:
           f = open(filename, mode)
       except IOError, err:
           yield None, err
       else:
           try:
               yield f, None
           finally:
               f.close()
   ```

   Used as follows: 使用方法如下：

   ```
   with opened_w_error("/etc/passwd", "a") as (f, err):
       if err:
           print "IOError:", err
       else:
           f.write("guido::0:0::/:/bin/sh\n")
   ```

7. Another useful example would be an operation that blocks signals. The use could be like this:

   
   另一个有用的例子是一个阻塞信号的操作。使用方法可以是这样的：

   ```
   import signal
   
   with signal.blocked():
       # code executed without worrying about signals
   ```

   An optional argument might be a list of signals to be blocked; by default all signals are blocked. The implementation is left as an exercise to the reader.
   一个可选参数可以是要被阻塞的信号列表；默认情况下会阻塞所有信号。实现留给读者作为练习。

8. Another use for this feature is the Decimal context. Here’s a simple example, after one posted by Michael Chermside:

   
   这个特性的另一个用途是十进制上下文。以下是一个简单的例子，源自 Michael Chermside 发布的内容：

   ```
   import decimal
   
   @contextmanager
   def extra_precision(places=2):
       c = decimal.getcontext()
       saved_prec = c.prec
       c.prec += places
       try:
           yield None
       finally:
           c.prec = saved_prec
   ```

   Sample usage (adapted from the Python Library Reference):
   示例用法（改编自 Python 库参考）：

   ```
   def sin(x):
       "Return the sine of x as measured in radians."
       with extra_precision():
           i, lasts, s, fact, num, sign = 1, 0, x, 1, x, 1
           while s != lasts:
               lasts = s
               i += 2
               fact *= i * (i-1)
               num *= x * x
               sign *= -1
               s += num / fact * sign
       # The "+s" rounds back to the original precision,
       # so this must be outside the with-statement:
       return +s
   ```

9. Here’s a simple context manager for the decimal module:

   
   这是一个简单的十进制模块上下文管理器：

   ```
   @contextmanager
   def localcontext(ctx=None):
       """Set a new local decimal context for the block"""
       # Default to using the current context
       if ctx is None:
           ctx = getcontext()
       # We set the thread context to a copy of this context
       # to ensure that changes within the block are kept
       # local to the block.
       newctx = ctx.copy()
       oldctx = decimal.getcontext()
       decimal.setcontext(newctx)
       try:
           yield newctx
       finally:
           # Always restore the original context
           decimal.setcontext(oldctx)
   ```

   Sample usage: 示例用法：

   ```
   from decimal import localcontext, ExtendedContext
   
   def sin(x):
       with localcontext() as ctx:
           ctx.prec += 2
           # Rest of sin calculation algorithm
           # uses a precision 2 greater than normal
       return +s # Convert result to normal precision
   
   def sin(x):
       with localcontext(ExtendedContext):
           # Rest of sin calculation algorithm
           # uses the Extended Context from the
           # General Decimal Arithmetic Specification
       return +s # Convert result to normal context
   ```

10. A generic “object-closing” context manager:

    
    一个通用的“对象关闭”上下文管理器：

    ```
    class closing(object):
        def __init__(self, obj):
            self.obj = obj
        def __enter__(self):
            return self.obj
        def __exit__(self, *exc_info):
            try:
                close_it = self.obj.close
            except AttributeError:
                pass
            else:
                close_it()
    ```

    This can be used to deterministically close anything with a close method, be it file, generator, or something else. It can even be used when the object isn’t guaranteed to require closing (e.g., a function that accepts an arbitrary iterable):
    这可以用于确定性地关闭任何具有关闭方法的对象，无论是文件、生成器或其他东西。即使在对象不一定需要关闭的情况下（例如，接受任意可迭代对象的函数），也可以使用：

    ```
    # emulate opening():
    with closing(open("argument.txt")) as contradiction:
       for line in contradiction:
           print line
    
    # deterministically finalize an iterator:
    with closing(iter(data_source)) as data:
       for datum in data:
           process(datum)
    ```

    (Python 2.5’s contextlib module contains a version of this context manager)
    （Python 2.5 的 contextlib 模块包含该上下文管理器的版本）

11. PEP 319

     

    gives a use case for also having a

     

    ```
    released()
    ```

     

    context to temporarily release a previously acquired lock; this can be written very similarly to the locked context manager above by swapping the

     

    ```
    acquire()
    ```

     

    and

     

    ```
    release()
    ```

     

    calls:

    
    PEP 319 提出了一个用例，说明还需要一个 `released()` 上下文来临时释放先前获取的锁；这可以通过交换 `acquire()` 和 `release()` 的调用，非常类似于上面的锁定上下文管理器来编写：

    ```
    class released:
      def __init__(self, lock):
          self.lock = lock
      def __enter__(self):
          self.lock.release()
      def __exit__(self, type, value, tb):
          self.lock.acquire()
    ```

    Sample usage: 示例用法：

    ```
    with my_lock:
        # Operations with the lock held
        with released(my_lock):
            # Operations without the lock
            # e.g. blocking I/O
        # Lock is held again here
    ```

12. A “nested” context manager that automatically nests the supplied contexts from left-to-right to avoid excessive indentation:

    
    一个“嵌套”的上下文管理器，自动从左到右嵌套提供的上下文，以避免过度缩进：

    ```
    @contextmanager
    def nested(*contexts):
        exits = []
        vars = []
        try:
            try:
                for context in contexts:
                    exit = context.__exit__
                    enter = context.__enter__
                    vars.append(enter())
                    exits.append(exit)
                yield vars
            except:
                exc = sys.exc_info()
            else:
                exc = (None, None, None)
        finally:
            while exits:
                exit = exits.pop()
                try:
                    exit(*exc)
                except:
                    exc = sys.exc_info()
                else:
                    exc = (None, None, None)
            if exc != (None, None, None):
                # sys.exc_info() may have been
                # changed by one of the exit methods
                # so provide explicit exception info
                raise exc[0], exc[1], exc[2]
    ```

    Sample usage: 示例用法：

    ```
    with nested(a, b, c) as (x, y, z):
        # Perform operation
    ```

    Is equivalent to: 相当于：

    ```
    with a as x:
        with b as y:
            with c as z:
                # Perform operation
    ```

    (Python 2.5’s contextlib module contains a version of this context manager)
    （Python 2.5 的 contextlib 模块包含此上下文管理器的一个版本）

## [Reference Implementation 参考实现](https://peps.python.org/pep-0343/#reference-implementation)

This PEP was first accepted by Guido at his EuroPython keynote, 27 June 2005. It was accepted again later, with `the __context__` method added. The PEP was implemented in Subversion for Python 2.5a1 The `__context__()` method was removed in Python 2.5b1
该 PEP 首次被 Guido 在 2005 年 6 月 27 日的 EuroPython 主旨演讲中接受。随后又再次被接受，并添加了 `the __context__` 方法。该 PEP 在 Python 2.5a1 的 Subversion 中实施。 `__context__()` 方法在 Python 2.5b1 中被移除。



# 草稿

statement

expression https://docs.python.org/3/reference/expressions.html#

operations

