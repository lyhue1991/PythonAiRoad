# 一文的读懂矩估计、极大似然估计和贝叶斯估计

<!-- #region -->
概率论和数理统计是机器学习重要的数学基础。

概率论的核心是已知分布求概率，数理统计则是已知样本估整体。

概率论和数理统计是互逆的过程。概率论可以看成是由因推果，数理统计则是由果溯因。

数理统计最常见的问题包括参数估计，假设检验和回归分析。



所谓参数估计，就是已知随机变量服从某个分布规律，但是概率分布函数的有些参数未知，那么可以通过随机变量的采样样本来估计相应参数。

参数估计最主要的方法包括矩估计法，极大似然估计法，以及贝叶斯估计法。

机器学习中常常使用的是极大似然估计法和贝叶斯估计法。

<!-- #endregion -->

### 一，矩估计法


矩估计的基本思想是用样本的k阶矩作为总体的k阶矩的估计量，从而解出未知参数。

例如$X$服从正态分布，但$\mu$和$\sigma$参数未知。

对$X$采样N次，得到$x_1,x_2,x_3,...,x_N$

试估计参数 $\mu$ 和$\sigma$


解：用样本的一阶距估计总体的一阶距，用样本的二阶中心距估计总体的二阶中心距。

可以得到：

$\hat{\mu} = \frac{1}{N}\sum_\limits{i=1}^{N}x_i$

$\hat{\sigma}^2 = \frac{1}{N}\sum_\limits{i=1}^{N}(x_i-\hat{\mu})^2$

对$\hat{\sigma}^2$的估计是有偏的，

无偏估计是

$\hat{\sigma}^2 = \frac{1}{(N-1)}\sum_\limits{i=1}^{N}(x_i-\hat{\mu})^2$


### 二，极大似然估计法


极大似然估计法简称MLE(Maximum Likelihood Estimation).

极大似然估计法先代入参数值计算观测样本发生的概率，得到似然函数，然后对似然函数求极大值，得到对应的参数，即为极大似然估计参数。

对于离散随机变量X，N次采样得到样本结果为$x_1,x_2,x_3,...,x_N$，则极大似然估计法的公式为：

$$\hat{\pmb{\theta}}
= \mathop{argmax}_{\pmb{\theta}}\prod_\limits{i=1}^{N} P(x_i;\pmb{\theta})
= \mathop{argmax}_{\pmb{\theta}}\sum_\limits{i=1}^{N} ln(P(x_i;\pmb{\theta}))
$$


对于连续随机变量X，如果其概率密度函数为 $f(x;\pmb{\theta})$，其中$\pmb{\theta}$为待求参数向量。

那么N次采样得到样本结果为$x_1,x_2,x_3,...,x_N$的概率正比于如下似然函数

$$L(x_1,x_2,x_3,...,x_N;\pmb{\theta})
= \prod_\limits{i=1}^{N} f(x_i;\pmb{\theta})$$

为了便于计算方便，可以构造对数似然函数为

$$lnL(x_1,x_2,x_3,...,x_N;\pmb{\theta}) = \sum_{i=1}^{N}ln(f(x_i;\pmb{\theta}))$$

对数似然函数取极大值时，有

$$\frac{\partial(ln L(x_1,x_2,x_3,...,x_N;\pmb{\theta}))}
{\partial \pmb{\theta}}= 0 $$

求解该方程可以得到$\pmb{\theta}$的极大似然估计$\hat{\pmb{\theta}}$。


例如$X$服从正态分布，但$\mu$和$\sigma$参数未知。

对$X$采样n次，得到$x_1,x_2,x_3,...,x_n$

试估计参数 $\mu$ 和$\sigma$


解：

正态分布的概率密度函数为

$$f(x_i; \mu, \sigma) = \frac{\sqrt{2} e^{- \frac{\left(- \mu + x_{i}\right)^{2}}{2 \sigma^{2}}}}{2 \sqrt{\pi} \sigma}$$ 

对应的对数似然函数为

$$lnL(x_1,x_2,x_3,...,x_N;\pmb{\theta}) = \sum_{i=1}^{N}ln(\frac{\sqrt{2} e^{- \frac{\left(- \mu + x_{i}\right)^{2}}{2 \sigma^{2}}}}{2 \sqrt{\pi} \sigma})$$

对数似然函数取极大值时，有

$$\frac{\partial lnL}{\partial \mu} = 
\sum_\limits{i=1}^{N}- \frac{1}{2 \sigma^{2}} \left(2 \mu - 2 x_{i}\right) = 0
$$

$$\frac{\partial lnL}{\partial \sigma} =
\sum_\limits{i=1}^{N}
\frac{1}{\sigma^{3}} \left(- \sigma^{2} + \left(\mu - x_{i}\right)^{2}\right) = 0
$$

解得

$\hat{\mu} = \frac{1}{N}\sum_\limits{i=1}^{N}x_i$

$\hat{\sigma}^2 = \frac{1}{N}\sum_\limits{i=1}^{N}(x_i-\hat{\mu})^2$


### 三，贝叶斯估计法


贝叶斯估计也叫做最大后验概率估计法,简称MAP(Maximum A Posterior)。

可以认为极大似然估计是贝叶斯估计不考虑先验概率的特例。

在概率论中有两大学派，频率学派和贝叶斯学派。

频率学派认为随机变量服从特定的统计分布规律，分布函数的参数是确定的数，可以通过抽样来估计。

和频率学派不同，贝叶斯学派认为一切皆为随机变量，随机变量的分布函数的参数也是随机变量，对其进行抽样估计时还必须考虑参数的先验分布。


<!-- #region -->
在贝叶斯学派中，似然函数被理解为$x_1,x_2,x_3,..,x_N$在$\pmb{\theta}$已知时的条件概率:
$$P(x_1,x_2,x_3,...,x_N\,|\,\pmb{\theta}) = L(x_1,x_2,x_3,...,x_N\,|\,\pmb{\theta})
= \prod_\limits{i=1}^{N} P(x_i\,|\,\pmb{\theta})$$

而$\pmb{\theta}$本身也为随机变量，具有先验概率分布函数 $P(\pmb{\theta})$

贝叶斯估计的想法是最大化$\pmb{\theta}$的后验概率,应用贝叶斯公式得到

$$\hat{\pmb{\theta}} = \mathop{argmax}_{\pmb{\theta}} P(\pmb{\theta}\,|\,x_1,x_2,x_3,...,x_N)
=\mathop{argmax}_{\pmb{\theta}}\prod_\limits{i=1}^{N}P(\pmb{\theta}) P(x_i\,|\,\pmb{\theta})
$$

当不考虑先验概率$P(\pmb{\theta})$时，最大化后验概率回到极大似然估计。

由于在实践中，先验概率$P(\pmb{\theta})$往往并不可知，所以极大似然估计法用的更多一些。

在机器学习中，有一种和引入先验概率等效的做法，那就是在目标函数(相当于对数似然函数)后面加入正则化项。

如果加入的是L1正则化，相当于假设了参数的先验分布符合双指数分布，而如果引入了L2正则化，相当于假设了参数的先验分布符合正态分布。


在机器学习中，经验风险最小化和极大似然估计对应，结构风险最小化和贝叶斯估计对应。
<!-- #endregion -->

```python

```

如果对本文内容理解上有需要进一步和作者交流的地方，欢迎在公众号"Python与算法之美"下留言。作者时间和精力有限，会酌情予以回复。

也可以在公众号后台回复关键字：加群，加入读者交流群和大家讨论。


![](./data/Python与算法之美logo.jpg)
