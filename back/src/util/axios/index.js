import http from "./axios"

// 菜单管理接口
export function getMenuAdd(data) {
    return http.post('/api/menuadd', data)
}

export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })
}


export function getMenuInfo(params) {
    return http.get('/api/menuinfo',  {
        params
    })
}


export function getMenuEdit(data) {
    return http.post('/api/menuedit',data)
}


export function getMenuDelete(data) {
    return http.post('/api/menudelete',data)
}

// 角色管理接口

// 角色添加
export function getRoleAdd(data) {
    return http.post('/api/roleadd',data)
}

// 角色列表
export function getRoleList(params) {
    return http.get('/api/rolelist',{
        params
    })
}

// 角色获取（一条）
export function getRoleInfo(params) {
    return http.get('/api/roleinfo',{
        params
    })
}

// 角色修改
export function getRoleEdit(data) {
    return http.post('/api/roleedit',data)
}

// 角色删除
export function getRoleDelete(data) {
    return http.post('/api/roledelete',data)
}


/* 管理员管理接口 */
//管理员添加
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}
//管理员列表
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
//管理员获取（一条）
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}
//管理员修改
export function getUserEdit(data){
    return http.post('/api/useredit',data)
}
//管理员删除
export function getUserDelete(data){
    return http.post('/api/userdelete',data)
}
//管理员总数（用于计算分页)
export function getUserCount(){
    return http.get('/api/usercount')
}
//管理员登录
export function getUserLogin(data){
    return http.post('/api/userlogin',data)
}


/* 分类管理接口 */
//封装分类添加接口
export function getCateAdd(data){
    return http.post('/api/cateadd',data)
}
//封装分类列表接口
export function getCateList(params){
    return http.get('/api/catelist',{
        params
    })
}
//封装分类获取（一条）接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装分类修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}


/* 商品规格管理接口 */
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}



/* 商品管理接口 */
//商品添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品修改
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
//商品删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}


// 会员管理接口

// 会员列表
export function getMemberList(params) {
    return http.get('/api/memberlist',{
        params
    })
}

// 会员获取（一条）
export function getMemberInfo(params) {
    return http.get('/api/memberinfo',{
        params
    })
}

// 会员修改
export function getMemberEdit(data) {
    return http.post('/api/memberedit',data)
}




/* 轮播图管理接口 */
//封装轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
//封装轮播图列表接口
export function getBannerList(params){
    return http.get('/api/bannerlist',{
        params
    })
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
//封装轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}




// 秒杀管理接口

// 秒杀添加
export function getSeckAdd(data) {
    return http.post('/api/seckadd',data)
}

// 秒杀列表
export function getSeckList(params) {
    return http.get('/api/secklist',{
        params
    })
}

// 秒杀获取（一条）
export function getSeckInfo(params) {
    return http.get('/api/seckinfo',{
        params
    })
}

// 秒杀修改
export function getSeckEdit(data) {
    return http.post('/api/seckedit',data)
}

// 秒杀删除
export function getSeckDelete(data) {
    return http.post('/api/seckdelete',data)
}