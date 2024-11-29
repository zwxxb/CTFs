<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * Hello World
 * 
 * @package HelloWorld 
 * @author qining
 * @version 1.0.0
 * @link http://typecho.org
 */
class HelloWorld_DB{
    private $flag="MRCTF{this_is_a_fake_flag}";
    private $coincidence;
    function  __wakeup(){
        $db = new Typecho_Db($this->coincidence['hello'], $this->coincidence['world']);
    }
}
class HelloWorld_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 激活插件方法,如果激活失败,直接抛出异常
     * 
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function activate()
    {
        Typecho_Plugin::factory('admin/menu.php')->navBar = array('HelloWorld_Plugin', 'render');
    }
    
    /**
     * 禁用插件方法,如果禁用失败,直接抛出异常
     * 
     * @static
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function deactivate(){}
    
    /**
     * 获取插件配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form 配置面板
     * @return void
     */
    public static function config(Typecho_Widget_Helper_Form $form)
    {
        /** 分类名称 */
        $name = new Typecho_Widget_Helper_Form_Element_Text('word', NULL, 'Hello World', _t('说点什么'));
        $form->addInput($name);
    }
    
    /**
     * 个人用户的配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form
     * @return void
     */
    public static function personalConfig(Typecho_Widget_Helper_Form $form){}
    
    /**
     * 插件实现方法
     * 
     * @access public
     * @return void
     */
    public static function render()
    {
        echo '<span class="message success">'
            . htmlspecialchars(Typecho_Widget::widget('Widget_Options')->plugin('HelloWorld')->word)
            . '</span>';
    }

    public function execute() {
        //Do nothing
        echo '<!DOCTYPE HTML>
<html class="no-js">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>页面没找到 - Hello World</title>

    <!-- 使用url函数转换相关路径 -->
    <link rel="stylesheet" href="http://127.0.0.1/usr/themes/default/normalize.css">
    <link rel="stylesheet" href="http://127.0.0.1/usr/themes/default/grid.css">
    <link rel="stylesheet" href="http://127.0.0.1/usr/themes/default/style.css">

    <!--[if lt IE 9]>
    <script src="//cdnjscn.b0.upaiyun.com/libs/html5shiv/r29/html5.min.js"></script>
    <script src="//cdnjscn.b0.upaiyun.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <!-- 通过自有函数输出HTML头部信息 -->
    <meta name="description" content="Just So So ..." />
<meta name="keywords" content="typecho,php,blog" />
<meta name="generator" content="Typecho 1.2/18.10.23" />
<meta name="template" content="default" />
<link rel="alternate" type="application/rss+xml" title="页面没找到 &raquo; Hello World &raquo; RSS 2.0" href="http://127.0.0.1/index.php/feed/" />
<link rel="alternate" type="application/rdf+xml" title="页面没找到 &raquo; Hello World &raquo; RSS 1.0" href="http://127.0.0.1/index.php/feed/rss/" />
<link rel="alternate" type="application/atom+xml" title="页面没找到 &raquo; Hello World &raquo; ATOM 1.0" href="http://127.0.0.1/index.php/feed/atom/" />
</head>
<body>
<!--[if lt IE 8]>
    <div class="browsehappy" role="dialog">当前网页 <strong>不支持</strong> 你正在使用的浏览器. 为了正常的访问, 请 <a href="http://browsehappy.com/">升级你的浏览器</a>.</div>
<![endif]-->

<header id="header" class="clearfix">
    <div class="container">
        <div class="row">
            <div class="site-name col-mb-12 col-9">
                            <a id="logo" href="http://127.0.0.1/">Hello World</a>
        	    <p class="description">Just So So ...</p>
                        </div>
            <div class="site-search col-3 kit-hidden-tb">
                <form id="search" method="post" action="http://127.0.0.1/" role="search">
                    <label for="s" class="sr-only">搜索关键字</label>
                    <input type="text" id="s" name="s" class="text" placeholder="输入关键字搜索" />
                    <button type="submit" class="submit">搜索</button>
                </form>
            </div>
            <div class="col-mb-12">
                <nav id="nav-menu" class="clearfix" role="navigation">
                    <a href="http://127.0.0.1/">首页</a>
                                                            <a href="http://127.0.0.1/index.php/start-page.html" title="关于">关于</a>
                                    </nav>
            </div>
        </div><!-- end .row -->
    </div>
</header><!-- end #header -->
<div id="body">
    <div class="container">
        <div class="row">

    
    

    <div class="col-mb-12 col-tb-8 col-tb-offset-2">

        <div class="error-page">
            <h2 class="post-title">404 - 页面没找到</h2>
            <p>你想查看的页面已被转移或删除了, 要不要搜索看看: </p>
            <form method="post">
                <p><input type="text" name="s" class="text" autofocus /></p>
                <p><button type="submit" class="submit">搜索</button></p>
            </form>
        </div>

    </div><!-- end #content-->
	
        </div><!-- end .row -->
    </div>
</div><!-- end #body -->

<footer id="footer" role="contentinfo">
    &copy; 2020 <a href="http://127.0.0.1/">Hello World</a>.
    由 <a href="http://www.typecho.org">Typecho</a> 强力驱动.
</footer><!-- end #footer -->

</body>';
    }

    public function action(){
        if(!isset($_SESSION)) session_start();
        if(isset($_REQUEST['admin'])) var_dump($_SESSION);
        if (isset($_POST['C0incid3nc3'])) {
			if(preg_match("/file|assert|eval|[`\'~^?<>$%]+/i",base64_decode($_POST['C0incid3nc3'])) === 0)
				unserialize(base64_decode($_POST['C0incid3nc3']));
			else {
				echo "Not that easy.";
			}
        }
    }
}
