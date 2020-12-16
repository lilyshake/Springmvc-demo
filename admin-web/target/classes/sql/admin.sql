CREATE DATABASE admin CHARACTER SET utf8;
USE admin;

#人员表
CREATE TABLE `userinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '表主键',
  `username` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `level` int(4) NOT NULL DEFAULT '3' COMMENT '权限，1是超级管理员，2是普通管理员，3是普通用户',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建的时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';


#日志表
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `operator_name` varchar(100) NOT NULL DEFAULT '' COMMENT '操作者',
  `operator_num` varchar(255) NOT NULL DEFAULT '' COMMENT '操作者编号',
  `opreator_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  `operation_type` varchar(50) NOT NULL DEFAULT '' COMMENT '操作类型，增加、删除、修改',
  `operation_detail` varchar(255) NOT NULL DEFAULT '' COMMENT '操作商品细节',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作日志表';

DROP TABLE IF EXISTS `notice_manage`;
CREATE TABLE `notice_manage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notice_name` varchar(255) DEFAULT NULL,
  `notice_type` varchar(255) DEFAULT NULL,
  `content` blob,
  `create_user` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `create_user_param` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='通知公告表';;