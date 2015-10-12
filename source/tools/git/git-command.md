Git不用介绍了，本文作为git使用的备忘录，
介绍Git安装、配置过程、常用命令和使用场景等。

<!--more-->

##Git 安装和配置

###ubuntu上git安装过程
```
sudo apt-get install git-all
```

或者选择性安装

```
sudo apt-get install git git-doc git-email git-gui gitg kdiff3
```

---

###git 配置过程

修改当前用户配置, --system 可以配置所有本机用户。

	git config --global user.name "xxx"
	git config --global user.email "xxx@yyy.com"
	git config --global core.editor vim
	git config --global color.ui true
	git config --global merge.tool kdiff3 
	git config --global alias.st status
	git config --global alias.ci commit
	git config --global alias.co checkout
	git config --global alias.br branch

---

查看配置结果

	jxiao1@jxiao1-OptiPlex-990:$ cat ~/.gitconfig
	[user]
		name = xxx
		email = xxx@yyy.com
	[core]
		editor = vim
	[color]
		ui = true
	[merge]
		tool = kdiff3
	[sendemail]
		suppresscc = all
		smtpserver = "xxx"

---

##Git Commands
**所有命令都可以tab补齐，也可以查看子命令help**

	git --version               #查看当前git版本号
	git config -e               #编辑版本库配置文件.git/config
	git config -e --global      #编辑用户全局配置文件 ～/.gitconfig
	git config -e --system      #编辑系统全局配置文件 /etc/gitconfig
	git config core.bare        #读取版本库配置文件core中bare属性的值
	git config core.bare true   #修改版本库配置文件core中bare属性的值
	git config a.b something    #添加版本库配置文件中一个a section b属性, 值为something
	git config --unset a.b      #删除版本库配置文件中a section的 b属性
	git config --global --get user.name  #获取user name
	
	git init demo               #初始化demo版本库
	git init --bare             #空目录中初始化一个空白仓库
	git clone url local-name	#clone一个仓库
	git clone --mirror          #镜像clone一个仓库， 之后可以 git remote update/git fetch更新和同步
	git status                  #查看版本库信息 -s 精简格式输出
	
	git add hello.c             #提交新文件或文件改到到暂存库（stage）
	git add -u                  #提交所有改动和删除内容
	git add .                   #提交所有改动和添加内容
	git add -A                  #提交所有改动
	git add -i                  #进入交互式提交界面
	git add -p [filename]       #分块提交改动
		stage this hunk [y,n,q,a,d,/,s,e?]
		s: 分割改动成小块
		y: 暂存该块
        n: 不暂存该块
		e: 手工编辑该块

	git checkout branchname     #切换到某个分支，同时更新HEAD，暂存区，工作区
	git checkout master^        #切换head到mater分支的最新版本前一个版本，同时更新HEAD，暂存区，工作区
	git checkout master         #切换到mater分支
	git checkout .              #清除工作区内所有被管理文件的修改，用暂存区内容覆盖
	git checkout -- filename    #用暂存区的内容覆盖工作区相应文件内容
	git checkout branchname -- filename  #用某个分支的对应文件，覆盖暂存区和工作区中相应文件
	git checkout [HEAD]         #汇总显示工作区，暂存区，HEAD 的差异
	
	git clean -fd               #清除没有纳入版本管理的文件

	git reset --hard HEAD^      #reset master 到上一个版本，--hard表示同时reset工作区和暂存区内容
	git reset --hard master@{2} #reset master 分支编号2的历史操作版本，重最新为0开始
	git reset --soft <commit>   #--soft表示只是reset master 引用
	git reset --soft HEAD^      #保留工作区更改， 回滚本次提交
	git reset [--mixed] <commit>	#--mixed(默认值，可以空)表示reset master 引用，同时reset 暂存区
	git reset [HEAD]            #reset 暂存区中未提交的内容，等同git add 的反操作，HEAD默认可以不写
	git reset --filename        #reset 暂存区中某个文件，等同git reset HEAD filename

	git commit -s -m "log message"  #提交暂存库修改到版本库 -s表示log中添加姓名和邮件标签
	git commit --amend              #修改还未push 的最后一次提交的log信息
	git commit --amend --allow-empty --reset-author   #重新修改最新提交，修正作者和提交者错误信息

	git log --pretty=fuller             #显示作者和提交者信息
	git log --pretty=oneline            #一行显示简单信息
	git log --pretty=raw                #显示commit，tree，parent 的SHA1码和作者及提交者信息
	git log --pretty=raw --graph SHA1   #显示对象的跟踪链（通过parent属性）
	git log --graph --pretty=--oneline  #显示当前分支跟踪链，简化版本（ID和log）
	git log -3 --pretty=oneline         #显示最近3条提交信息
	git log --oneline HEAD~3..HEAD      #显示最近3条提交信息
	git log --oneline ^:/"git mv test" HEAD  #查看HEAD相关历史版本，但是不含log为“git mv test”及其历史版本
	git log -p HEAD	                    #显示所有历史改动文件及改动内容，比较多
	git log --stat HEAD                 #显示所有历史改动文件
	git log --oneline --decorate	    #显示提交对应的tag及其他引用
	git log --oneline --pretty=format:%s -1 #获取最后一次提交的commit 标题
	git log --format:%h -1              #获取最后一次提交的commit ID

	git show HEAD --stat                #显示单个版本的改动文件，HEAD 表示最新提交的版本
	git show-ref                        #查看所有引用
	
	git diff                    #比较工作区和暂存区的差异
	git diff --cached           #比较暂存区和HEAD的差异
	git diff HEAD               #比较工作区和HEAD的差异
	git diff HEAD^ HEAD         #比较最新提交的改动情况
	git diff HEAD^ HEAD -- filename	#比较最新提交的某个文件的改动情况
	git diff --word-diff        #逐词比较

	git blame filename          #文件追溯，显示每行的提交者和版本
	git blame -L 6 +5 filename  #文件追溯，只显示第6行开始的5行内容情况
	
	git branch                      #显示本地分支列表
	git branch -r                   #显示远程分支列表
	git branch -a                   #显示所有分支列表
	git branch branchname <commit>  #基于<commit>创建分支，默认为基于HEAD
	git branch -d branchname        #删除分支名称， -D表示如果该分支从未被合并，也强行删除，-d不会
	git branch -m oldbranchname newbranchname	#重命名分支，-M表示重名也强行提交，-m不会

	git tag -m "log message" tagname #生成tag
	git tag                         #显示本地tag
	git tag -l V3_*                 #显示名字符合正则表达式的tag
	git tag -d tagname              #删除tag
	git pull                        #默认以merge的方式pull
	git pull --rebase               #以git rebase 的方式pull， 默认是 --no-rebase

	git push                        #推送到单前默认远程主机
	git push origin tagname         #把本地tag推送到远程
	git push remote-name            #把本地修改推送到远程
	git push --tags                 #默认不推送tags，需要添加--tags
	git push --force                #如果远程和本地不一致，强行覆盖
	git push origin local-branch:   #仅仅提交本地某个分支
	git push origin :branch-name    #删除远程分支
	
	git pull-request HEAD~2 url     #生成pull request
	git send-email --to xxx --cc xxx file  #将file（比如pull request）内容发送邮件

	git remote -v                   #显示当前操作的远程版本库
	git remote update               #更新所有注册的远程版本库
	git remote add new-remote path  #注册新的远程版本库
	git remote rename old-remote new-remote #更改远程版本库名称
	git remote rm remotename        #删除某个注册的远程版本库
	git remote show origin          #查看远程版本库地址，当前分支等信息
	git remote set-url origin <path> #修改push URL，比如http改为ssh的
	
	git format-patch origin/master  
	git format-patch HEAD^          #生成patch
	git am -3 patch                 #应用patch
	
	git grep "string-to-find"       #在工作区搜索字符串

	git rev-parse --git-dir         #显示.git目录所在位置
	git rev-parse --show-toplevel   #显示工作区顶层目录
	git rev-parse --show-prefix     #相对与工作区根目录的相对目录
	git rev-parse --show-cdup       #相对与工作区根目录的回退深度（ ../../../形式）
	git rev-parse --abbrev-ref HEAD #获取HEAD指向的分支名，也就是当前分支。
	git rev-parse --symbolic --branches #显示分支
	git rev-parse --symbolic --tags     #显示tag
	git rev-parse HEAD              #显示版本库最新提交版本的SHA1码（版本ID）
	git rev-parse HEAD master       #同时显示最新提交和mater分支最新版本的SHA1码
	git rev-parse HEAD^             #显示版本库最新提交版本的上一个版本的SHA1码（版本ID）

	git rev-list origin/master..HEAD #查看还未提交到远程的本地提交
	git rev-list --oneline A        #查看版本关系， A开始的所有历史提交的关系


	ls --full-time                      #用系统命令，查看工作区文件
	git ls-tree -l HEAD                 #查看版本库当前提交版本的目录树
	git ls-files -s                     #查看暂存区的目录树
	git write-tree                      #将暂存区的目录树写入Git对象库，输出tree ID
	git ls-tree -l -r -t SHA1           #查看对应tree ID 的目录树
	find . -path ./.git -prune -o -type f -printf "%-20p\t%s\n"  #查看工作区所有文件的大小


	git stash               #保存当前工作去进度，同时回覆所有工作区包括暂存区的改动
	git stash list          #显示stash 列表
	git stash pop           #恢复最新stash 保存的进度，同时删除该stash记录
	git stash apply         #恢复最新stash 保存的进度，当时不删除stash记录
	git stash drop [stash]  #删除某个stash记录，默认删除最新的
	git stash clear         #删除所有stash记录

	git cat-file -t SHA1    #显示SHA1码对应的git对象或文件的类型
	git cat-file -p SHA1    #显示SHA1码对应的git对象或文件的内同
	git cat-file -p D^0     #显示tag D 对应的提交的内容

	git reflog show master | head 5	#查看master分支日志信息，能看到版本号和操作历史记录，head 5 表示显示前5行
	git reflog -1               #查看HEAD 分支日志信息， -1表示显示最后一次操作信息

	git merge <commit>          #合并当前分支和<commit>提交内容
	git cherry-pick <commitID>  # 应用其他分支上的某个提交到这个分支上。
	git rebase --onto C E^ F	#等同：
				#git reset --hard C
				#git cherry-pick E
				#git cherry-pick F
				
	git describe                #显示基于最近建立的tag名的版本名
	git describe --always       #显示基于最近建立的tag名的版本名，没有则显示简短ID

	git rm filename             #删除文件名或者目录夹
	git mv oldname newname      #文件重命名

	git revert <commitID>       #对某次提交做一次撤销提交，本身也算是一次提交

	git fsck                    #查看所有未被任何引用关联的松散对象
	git prune                   #清除未关联的松散对象

	git mergertool --tool=kdiff3	#用kdiff3合并冲突，默认系统提供meld之类的


------

##Git Usages

###临时生成 git patch

1.进入需要生产临时patch的代码目录

```
git init
git add -A
git commit -s -m "init-message"
```

2.修改代码，然后按照下面的步骤提交并生成patch，不需要push

```
git add -A
git commit -s -m "commit-message" 
git show
git format-patch -1
```


