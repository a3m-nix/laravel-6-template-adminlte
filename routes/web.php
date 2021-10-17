<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'admin/home');

Auth::routes(['register' => true]);

// Change Password Routes...
Route::get('change_password', 'Auth\ChangePasswordController@showChangePasswordForm')->name('auth.change_password');
Route::patch('change_password', 'Auth\ChangePasswordController@changePassword')->name('auth.change_password');

Route::group(['middleware' => ['auth', 'role:administrator'], 'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/home', 'HomeController@index')->name('home');
    Route::resource('permissions', 'Admin\PermissionsController');
    Route::delete('permissions_mass_destroy', 'Admin\PermissionsController@massDestroy')->name('permissions.massDestroy');
    Route::resource('roles', 'Admin\RolesController');
    Route::delete('roles_mass_destroy', 'Admin\RolesController@massDestroy')->name('roles.massDestroy');
    Route::delete('users_mass_destroy', 'Admin\UsersController@massDestroy')->name('users.massDestroy');
    Route::resource('users', 'Admin\UsersController');
});

Route::group(['middleware' => ['auth', 'role:operator'], 'prefix' => 'operator', 'as' => 'operator.'], function () {
    Route::get('home', 'OperatorHomeController@index')->name('home');
    Route::resource('school', SchoolController::class);
});
