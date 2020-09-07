# 一文读懂EM最大期望算法和一维GMM高斯混合模型


EM最大期望算法是一个**数值求解似然函数极大值的迭代算法**，就好像梯度下降算法是一种数值求解损失函数极小值的迭代算法一样。

EM算法通常**适合于随机变量依赖于另外一些不可观测的随机变量(称之为隐含变量或者中间变量)的场景**。

此时由于似然函数的表示形式较为复杂(含有对隐含变量的累加求和或者积分)，难以求导获取似然函数的极大值，也无法方便地应用梯度下降算法进行优化。

而**EM算法是一个类似梯度下降算法的迭代算法，它首先给随机变量分布参数赋初始值，然后寻找到了一个便于优化的似然函数的下界 (恰好为似然函数在某个分布下的期望Expectation，期望中消去了隐变量)，并通过不断地优化(Maximization) 这个下界求解似然函数的极值**。

EM算法在机器学习的许多算法中都有使用到，如

* KMeans： 实际上K-Means是一种Hard EM算法，
  隐变量直接取最大概率的位置。
* 支持向量机的SMO算法
* LDA主题模型参数估计
* 混合高斯模型的参数估计
* HMM隐马尔科夫模型的参数估计

本篇文章我们将详述EM算法的推导过程，并以一维GMM高斯混合模型为例，示范EM算法的应用方法。




### 一，EM最大期望算法


当我们关心的随机变量依赖于另外一些不可观测的随机变量时，通过对我们关心的随机变量采样，我们将难以直接通过最大似然估计的方法推断我们关心的随机变量分布律中的未知参数。

例如我们有100个学生的身高数据，其中有一些是男生，另外一些是女生。男生和女生的身高服从不同的正态分布，但是我们不知道哪些数据是男生的，哪些是女生的，这是这个模型的隐含变量，是不可以被观测到的。

那么如何根据这批身高数据估计男女生各自正态分布的均值和方差，以及这批数据中男生的比例呢？

期望最大化算法 EM (Expectation Maximization)这时候就派上用场了，它能够解决这种含有隐含随机变量的模型的参数估计的问题。


设观测随机变量为$X$, 隐含随机变量为$Z$，待确定参数为$\pmb{\theta}$。

当$Z$和$\pmb{\theta}$确定时，$X$的分布函数由$P(x\, |\, z;\pmb{\theta})$给出。

按照极大似然原理，并使用全概率公式，似然函数可以写成

 $$L(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta})=  
 \prod_\limits{i=0}^{N}P(x^{(i)}\,;\,\pmb{\theta})=
 \prod_\limits{i=0}^{N}\sum_{z}P(z;\pmb{\theta})P(x^{(i)}\,|z;\,\pmb{\theta})$$
 
 对数似然函数可以写成

 $$ln{L(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta})}=  
 \sum_\limits{i=0}^{N}ln(\sum_{z}P(z;\pmb{\theta})P(x^{(i)}\,|z;\,\pmb{\theta}))$$
 
 对数似然函数中，由于有对$P(z;\pmb{\theta})$的求和，如果尝试对$\pmb{\theta}$求偏导等于0来计算最优的$\pmb{\theta}$，将难以得到对应的解析解。这和目标函数非常复杂时，无法直接解析求解只能使用梯度下降这类迭代算法是一样的。
 
 从原则上说，在一些较为简单的情况下我们也能够使用梯度下降法求解对数似然的最优值，例如当隐藏变量Z是离散随机变量时，且可取值较少，我们很容易将对z的求和表示出来，从而可以计算梯度进而使用梯度下降法。
 
 但对于一般情况，对z的求和将难以进行，如果Z是连续的随机变量，对z的求和将变成积分，此时使用梯度下降法将更加困难。
 
 我们可以尝试和梯度下降算法效果相当的迭代算法。最大期望算法EM正是可以实现这个目的。
 
 大概原理如下，我们首先给$\pmb{\theta}$赋初始值 $\pmb{\theta}^{\{0\}}$，然后在此基础上，找到一个可以使得对数似然函数变大的$\pmb{\theta}^{\{1\}}$，然后再在此基础上找到一个能够使对数似然函数变得更大的$\pmb{\theta}^{\{2\}}$,如此便可不断地提高对数似然函数的值。迭代执行n干次后，如果$\pmb{\theta}^{\{n\}}$和$\pmb{\theta}^{\{n+1\}}$的差值足够小，那么我们认为就找到了比较合适的 
 $\pmb{\theta}^{\{n\}}$  作为 $\pmb{\theta}$ 的估计值。
 
 下面阐述最大期望算法的原理推导。
 
 假设在第n次迭代，我们的对数似然函数取值为
 
$$lnL(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta}^{\{n\}}) = \sum_\limits{i=0}^{N}ln(\sum_{z}P(z;\pmb{\theta}^{\{n\}})P(x_i\,|z;\,\pmb{\theta}^{\{n\}})$$
 
我们希望找到一个$\pmb{\theta}^{\{n+1\}}$使得

$$lnL(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta}^{\{n+1\}})\ge lnL(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta}^{\{n\}}) $$

下面我们开始寻找符合条件的$\pmb{\theta}^{\{n+1\}}$

构造函数

$$F(\pmb{\theta}) = lnL(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta}) $$

$$=\sum_\limits{i=0}^{N}ln(\sum_{z}P(z;\pmb{\theta})P(x^{(i)}\,|z;\,\pmb{\theta}))
$$

$$=\sum_\limits{i=0}^{N}ln(\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}})\frac{P(z;\pmb{\theta})P(x^{(i)}\,|\,z;\pmb{\theta})}{P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}})})
$$


由于$ln(x)$是严格凹函数，Jensen不等式成立

$$ln(E(X)) >= E(ln(X))$$

存在以下缩放：

$$F(\pmb{\theta}) = lnL(x^{(1)},x^{(2)},x^{(3)},...,x^{(N)};\pmb{\theta}) \ge$$

$$=\sum_\limits{i=0}^{N}\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}}) ln \frac{P(z;\pmb{\theta})P(x^{(i)}\,|\,z;\pmb{\theta})}{P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}})} = G(\pmb{\theta})
$$



注意到

$$  G(\pmb{\theta}^{\{n\}}) =\sum_\limits{i=0}^{N}\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}}) ln \frac{P(x^{(i)},\,z;\pmb{\theta}^{\{n\}})}{P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}})} $$

$$ =\sum_\limits{i=0}^{N}(\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}})) ln P(x^{(i)};\pmb{\theta}^{\{n\}}) $$

$$ =\sum_\limits{i=0}^{N} ln P(x^{(i)};\pmb{\theta}^{\{n\}}) $$

$$= F(\pmb{\theta}^{\{n\}}) $$

因此


$$\mathop{max}_{\pmb{\theta}}(G(\pmb{\theta})) >= F(\pmb{\theta}^{\{n\}})$$


取$$\pmb{\theta}^{\{n+1\}} = \mathop{argmax}_{\pmb{\theta}}G(\pmb{\theta})$$

则有


$$F(\pmb{\theta}^{\{n+1\}}) \ge G(\pmb{\theta}^{\{n+1\}})\ge F(\pmb{\theta}^{\{n\}}) $$

即符合我们寻找的条件。

消去无关量，我们可以得到

$$\pmb{\theta}^{\{n+1\}} = \mathop{argmax}_{\pmb{\theta}}\sum_\limits{i=0}^{N}\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}}) ln P(x^{(i)},z;\pmb{\theta})$$



注意到$P(z|x^{(i)};\pmb{\theta})$实际上是一个分布，因此右边可以理解成求随机变量

$ln P(x^{(i)},z;\pmb{\theta})$在$P(z|x^{(i)};\pmb{\theta})$分布下期望的最大值。

$$\pmb{\theta}^{\{n+1\}} = \mathop{argmax}_{\pmb{\theta}}\sum_\limits{i=0}^{N}Expectation(ln P(x^{(i)},z;\pmb{\theta})))$$


总结下 EM算法算法的流程：

(1) 初始化 $\pmb{\theta} = \pmb{\theta}^{\{0\}}$。

注意这里的模型参数$\pmb{\theta}$要是完备的，即给定这些参数，能够计算联合概率分布函数

$P(x,z|\pmb\theta)$,对于男女生混合身高的例子，我们的参数应当包括$\mu_1,\sigma_1,\mu_2,\sigma_2,\alpha$,即男生平均身高和身高标准差，女生平均身高和身高标准差，以及男生的比例。

(2) 计算E步，又分成两小步，先计算概率分布$P(z|x^{(i)};\pmb{\theta})$,再算出期望$\sum_\limits{i=0}^{N}Expectation(ln P(x^{(i)},z;\pmb{\theta})))$

(3) 对E求极大，解出$\pmb\theta$的新的估计，将新的估计值代入第(1)步，直到收敛。

可以证明EM算法是收敛的，但不能保证它能收敛到全局最优，因此可以尝试多个不同的初始值，计算结果，并挑选能够使似然函数取值最大的结果。





### 二，一维GMM高斯混合模型


高斯分布模型也叫正态分布模型，其概率密度函数如下：

$$\phi(x^{(i)}; \mu, \sigma) = \frac{1}{ \sqrt{2\pi} \sigma} e^{- \frac{(- \mu + x^{(i)})^{2}}{2 \sigma^{2}}}$$ 

GMM高斯混合模型的概率密度函数为多个高斯分布的线性组合：


$$f(x^{(i)}; \mu_1,\mu_2,…\mu_K, \sigma_1,\sigma_2,…\sigma_K,\alpha_1,\alpha_2,…,\alpha_K) = \sum_\limits{k=1}^{K} \alpha_k  \phi(x^{(i)}; \mu_k, \sigma_k) = \sum_\limits{k=1}^{K} \alpha_k \frac{1}{ \sqrt{2\pi} \sigma_k} e^{- \frac{(- \mu_k + x^{(i)})^{2}}{2 \sigma_k^{2}}}$$ 

其中$\alpha_k$为正数，并且：

$$\sum_\limits{k=1}^{K} \alpha_k = 1$$ 

高斯混合模型的$\alpha_k$参数可以理解为样本属于第$k$类的概率。

则高斯混合模型的概率密度函数可以表示成如下形式：


$$f(x^{(i)}; \pmb{\mu}, \pmb{\sigma},\pmb{\alpha}) = \sum_\limits{z=1}^{K} P(z;\pmb{\alpha})  P(x^{(i)}\,|\,z;\pmb{\mu},\pmb{\sigma}) $$


根据EM算法，

（1）我们首先取初始化参数

$$\pmb{\mu} = \pmb{\mu}^{\{0\}}, \pmb{\sigma} = \pmb{\sigma}^{\{0\}},\pmb{\alpha} = \pmb{\alpha}^{\{0\}} $$ 

然后执行迭代过程。

（2）我们先求期望值

$$Expectation = \sum_\limits{i=0}^{N}\sum_{z}P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}}) ln P(x^{(i)},z;\pmb{\theta})$$

代入贝叶斯公式


$$P(z\,|\,x^{(i)};\pmb{\theta}^{\{n\}}) = \frac{P(x^{(i)}\,|\,z;\pmb{\theta}^{\{n\}}) P(z;\pmb{\theta}^{\{n\}})}{P(x^{(i)};\pmb{\theta}^{\{n\}})} = \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}$$

$$Expectation = \sum_\limits{i=0}^{N}\sum_{z} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}  
ln(\alpha_{z} \phi(x^{(i)}; \mu_z, \sigma_z))$$

（3）我们求期望极大值对应的 $\pmb{\theta}$ 作为  $\pmb{\theta}^{\{n+1\}}$

考虑到约束 $$\sum_\limits{k=1}^{K} \alpha_k = 1$$ 

根据拉格朗日乘子法，作拉格朗日函数

$$L = Expectation - \lambda (\sum_\limits{k=1}^{K} \alpha_k - 1) $$

取极大值时我们有：

$$\frac{\partial L }{\partial \lambda } = 0$$

$$\frac{\partial L }{\partial \alpha_z} = 0$$

$$\frac{\partial L }{\partial \mu_z} = 0$$

$$\frac{\partial L }{\partial \sigma_z} = 0$$


于是我们有：

$$\sum_\limits{k=1}^{K} \alpha_k = 1$$ 


$$\sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}  
\frac{1}{\alpha_{z} } - \lambda = 0$$


$$\sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}  \frac{(\mu_z -x^{(i)})}{2 \sigma_z^{2}} = 0 $$

$$\sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}   (\frac{(\mu_z -x^{(i)})^2}{4 \sigma_z^{3}} - \frac{1}{\sigma_z}) = 0 $$

解得：

$$\alpha_z^{\{n+1\}} = \sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}} $$


$$\mu_z^{\{n+1\}} = \frac{1}{\alpha_z^{\{n+1\}} } \sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}} x^{(i)} $$


$$\sigma_z^{\{n+1\}} = \sqrt{\sum_\limits{i=0}^{N} \frac{\phi(x^{(i)}; \mu_z^{\{n\}}, \sigma_z^{\{n\}}) \alpha_z^{\{n\}}}{\sum_\limits{k=1}^{K} \phi(x^{(i)}; \mu_k^{\{n\}}, \sigma_k^{\{n\}}) \alpha_k^{\{n\}}}   \frac{(\mu_z^{\{n+1\}} -x^{(i)})^2}{4 }  } $$


如此迭代，直到收敛。

![](./data/Python与算法之美logo.jpg)




