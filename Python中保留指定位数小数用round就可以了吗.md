# Python保留指定位数小数用round就可以了吗？


在项目实践中，程序员经常会收到产品经理保存指定位数小数的需求。

在Python语言中，我们通常会使用内置函数round来完成这个功能，保留指定位数的小数。

round的用法非常简单。例如：


```python
round(3.1415926,3)
```

```python
round(-2.7182818,3)
```







那么，这个函数是否就是一个完美的解决方案呢？答案是否定的，round这个函数存在这样几个缺点。

**1，round有时候无法正确地四舍五入。**

```python
round(1.205,2) #结果中末位5进位加一
```

```python
round(1.265,2) #结果中末位5被舍去
```

实际上round这个函数的舍入的原则是：四舍六入五平分。

"五平分"就是出现5时，是进位加一还是舍去基本是一半一半的。



**2，round会自动舍去末尾的0.**

```python
round(2.00004,2)
```

```python
round(-1.99999,2)
```

有没有什么方法能够规避以上缺点呢？可以试试这个方法。

```python
from decimal import Decimal,ROUND_HALF_UP
def smart_round(x,n):
    return str(Decimal(x).quantize(Decimal("0."+"0"*n),rounding=ROUND_HALF_UP))
```

```python
smart_round("1.205",2)
```

```python
smart_round("1.265",2)
```

```python
smart_round("-1.255",2)
```

```python
smart_round(-1.99999999,2)
```

```python
smart_round(2.00004,2)
```

```python

```

这个函数能够很好地解决四舍五入和末尾为0的这两个问题。

注意的是，为了规避末尾为0的问题，这个函数的返回值是一个str类型。

其输入参数可以是float类型或者str类型，但推荐使用str类型。

根据四舍五入原则保留指定位数小数的方法，你get到了吗？😋😋



```python

```

```python

```
