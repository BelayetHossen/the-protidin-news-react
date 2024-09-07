<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\backend\TagController;
use App\Http\Controllers\backend\InfoController;
use App\Http\Controllers\backend\PageController;
use App\Http\Controllers\backend\PostController;
use App\Http\Controllers\backend\RoleController;
use App\Http\Controllers\backend\AdminController;
use App\Http\Controllers\backend\LoginController;
use App\Http\Controllers\backend\VideoController;
use App\Http\Controllers\frontend\HomeController;
use App\Http\Controllers\backend\MessageController;
use App\Http\Controllers\backend\SettingController;
use App\Http\Controllers\backend\AdBannerController;
use App\Http\Controllers\backend\CategoryController;
use App\Http\Controllers\backend\PermissionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




// Admin login
Route::post('/admin/login', [LoginController::class, 'adminLogin']);
Route::post('/admin/password/forgot', [LoginController::class, 'passwordForgot']);
Route::post('/admin/password/update', [LoginController::class, 'updatePassword']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/logout', [LoginController::class, 'logout']);
    Route::get('/admin/loggedin', [LoginController::class, 'findLoggedInAdmin']);
});

// Permission
Route::post('/permission/store', [PermissionController::class, 'store']);
Route::get('/permissions/all', [PermissionController::class, 'allPermissions']);
Route::get('/permission/status/{id}', [PermissionController::class, 'statusChange']);
Route::get('/permission/get/{id}', [PermissionController::class, 'permissionGet']);
Route::put('/permission/update', [PermissionController::class, 'permissionUpdate']);
Route::get('/permission/delete/{id}', [PermissionController::class, 'permissionDelete']);

// Role
Route::post('/role/store', [RoleController::class, 'store']);
Route::get('/roles/all', [RoleController::class, 'allRoles']);
Route::get('/role/status/{id}', [RoleController::class, 'statusChange']);
Route::get('/role/get/{id}', [RoleController::class, 'roleGet']);
Route::put('/role/update', [RoleController::class, 'update']);
Route::get('/role/delete/{id}', [RoleController::class, 'delete']);

// Admin
Route::post('/admin/store', [AdminController::class, 'store']);
Route::get('/admins/all', [AdminController::class, 'allAdmins']);
Route::get('/admin/status/{id}', [AdminController::class, 'statusChange']);
Route::get('/admin/get/{id}', [AdminController::class, 'adminGet']);
Route::post('/admin/update', [AdminController::class, 'update']);
Route::get('/admin/delete/{id}', [AdminController::class, 'delete']);

//Category
Route::post('/category/store', [CategoryController::class, 'categoryStore']);
Route::get('/category/all', [CategoryController::class, 'allCategories']);
Route::get('/category/status/{id}', [CategoryController::class, 'categoryStatus']);
Route::get('/category/show-home/status/{id}', [CategoryController::class, 'categoryShowHome']);
Route::get('/category/delete/{id}', [CategoryController::class, 'categoryDelete']);
Route::get('/category/get/{id}', [CategoryController::class, 'categoryGet']);
Route::post('/category/update', [CategoryController::class, 'categoryUpdate']);

//Sub Category
Route::post('/subcategory/store', [CategoryController::class, 'subCategoryStore']);
Route::get('/subcategory/all', [CategoryController::class, 'allSubCategories']);
Route::get('/subcategory/status/{id}', [CategoryController::class, 'subCategoryStatus']);
Route::get('/subcategory/delete/{id}', [CategoryController::class, 'subCategoryDelete']);
Route::get('/subcategory/get/{id}', [CategoryController::class, 'subCategoryGet']);
Route::post('/subcategory/update', [CategoryController::class, 'subCategoryUpdate']);

// Sub Sub Category
Route::get('/subcategory-by-category/get/{id}', [CategoryController::class, 'subCategoryGetByCategory']);
Route::get('/subsubcategory-by-subcategory/get/{id}', [CategoryController::class, 'subSubCategoryGetBySubCategory']);
Route::post('/subsubcategory/store', [CategoryController::class, 'subsubCategoryStore']);
Route::get('/subsubcategory/all', [CategoryController::class, 'allSubSubCategories']);
Route::get('/subsubcategory/status/{id}', [CategoryController::class, 'subSubCategoryStatus']);
Route::get('/subsubcategory/delete/{id}', [CategoryController::class, 'subSubCategoryDelete']);
Route::get('/subsubcategory/get/{id}', [CategoryController::class, 'subSubCategoryGet']);
Route::post('/subsubcategory/update', [CategoryController::class, 'subSubCategoryUpdate']);

// Tags
Route::post('/tag/store', [TagController::class, 'store']);
Route::get('/tag/all', [TagController::class, 'allTags']);
Route::get('/tag/status/{id}', [TagController::class, 'statusChange']);
Route::get('/tag/get/{id}', [TagController::class, 'tagGet']);
Route::put('/tag/update', [TagController::class, 'tagUpdate']);
Route::get('/tag/delete/{id}', [TagController::class, 'tagDelete']);

// Post
Route::post('/post/store', [PostController::class, 'postStore']);
Route::get('/post/all', [PostController::class, 'allPosts']);
Route::get('/post/status/{id}', [PostController::class, 'postStatus']);
Route::get('/post/headline/{id}', [PostController::class, 'postheadlineStatus']);
Route::get('/post/delete/{id}', [PostController::class, 'postDelete']);
Route::get('/post/get/{id}', [PostController::class, 'postGet']);
Route::post('/post/update', [PostController::class, 'postUpdate']);

// Settings
Route::get('/setting/identity', [SettingController::class, 'identityfatch']);
Route::post('/setting/identity', [SettingController::class, 'identityUpdate']);

Route::get('/setting/information', [InfoController::class, 'informationfatch']);
Route::post('/setting/information', [InfoController::class, 'informationUpdate']);
// Ad banner
Route::get('/setting/adbanner', [AdBannerController::class, 'adbannerGet']);
Route::post('/setting/adbanner/{cat}', [AdBannerController::class, 'adbannerUpdate']);

// Pages
Route::get('/page/get/privacy', [PageController::class, 'pagePrivacy']);
Route::get('/page/get/terms', [PageController::class, 'pageTerms']);
Route::post('/page/privacy/update', [PageController::class, 'privacyUpdate']);
Route::post('/page/terms/update', [PageController::class, 'termsUpdate']);

// Videos
Route::post('/video/store', [VideoController::class, 'store']);
Route::get('/video/all', [VideoController::class, 'allVideos']);
Route::get('/video/status/{id}', [VideoController::class, 'statusChange']);
Route::get('/video/get/{id}', [VideoController::class, 'videoGet']);
Route::post('/video/update', [VideoController::class, 'videoUpdate']);
Route::get('/video/delete/{id}', [VideoController::class, 'videoDelete']);



// message
Route::get('/message/all', [MessageController::class, 'allMessages']);
Route::get('/message/get/{id}', [MessageController::class, 'messageGet']);
Route::post('/message/store', [MessageController::class, 'store']);
Route::post('/messages/mark-as-read/{id}', [MessageController::class, 'markAsRead']);
Route::get('/message/delete/{id}', [MessageController::class, 'messageDelete']);

// Home routes
Route::get('/home/post', [HomeController::class, 'homePost']);
Route::get('/home/header/categories', [HomeController::class, 'headerCategories']);
Route::get('/home/categories', [HomeController::class, 'homeCategories']);
Route::get('/home/category/post/{cat_id}', [HomeController::class, 'homeCategoryPost']);
Route::get('/posts/{id}/click', [HomeController::class, 'clickPost']);
Route::post('/post/search', [HomeController::class, 'searchByTitle']);

Route::get('/video/post', [HomeController::class, 'videoPost']);

// Post details page routes
Route::get('/post/{slug}', [HomeController::class, 'getSinglePost']);

// category page
Route::get('/category/post/{slug}', [HomeController::class, 'getPostsByCategory']);

