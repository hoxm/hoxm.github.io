This page record my step to setup the this hexo based personal blog.

<!--more-->

###Install [+](http://hexo.io/docs/setup.html)

	$ npm install -g hexo
	$ mkdir hexo-blog
	$ cd hexo-blog
	$ hexo init
	$ npm install
	$ hexo server

Browse http://localhost:4000/


###Themes [+](https://github.com/hexojs/hexo/wiki/Themes)
Select your them, I like the following light style themes.)

	git clone https://github.com/ken8203/hexo-theme-alberta.git themes/alberta
	git clone https://github.com/kywk/hexo-theme-awe.git thems/awe
	git clone https://github.com/xing5/hexo-theme-codeland.git themes/codeland
	git clone https://github.com/coneycode/coney.git themes/coney
	git clone https://github.com/imbyron/hexo-theme-daisy.git themes/daisy
	git clone https://github.com/wzpan/hexo-theme-freemind.git themes/freemind
	git clone https://github.com/wizicer/iceman.git themes/iceman
	git clone https://github.com/shulhi/hexo-theme-damnclean.git themes/damnclean

> Do the theme special things according to the readme. For example, freemind:

```
npm install hexo-tag-bootstrap --save
```

> Add new pages, Categories page like this, and also tags page.

```
hexo new page Categories
```

> Add index.html in source/categories/
	title: Categories
	layout: categories
	---

###Change the blog templates
Edit scaffolds/post.md

	title: {{ title }}
	date: {{ date }}
	categories: 
	tags: 
	---

###Configuration [+](http://hexo.io/docs/configuration.html)

	deploy:
	  type: github
	  repository: https://github.com/hoxm/hoxm.github.io.git
	  branch: master

###Add new page
```
hexo new page "About" 
```

###Write blog [+](http://hexo.io/docs/writing.html)
```
hexo new "postName" ... \#write you blog here
```

###Deploy [+](http://hexo.io/docs/deployment.html)

	hexo clean					#Clean public folder and cache files
	hexo generate               #Generate the static page into public folder
	hexo deploy [-m "message"]  #Default commit message: YYYY-MM-DD HH:mm:ss
