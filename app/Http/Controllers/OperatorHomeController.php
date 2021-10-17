<?php

namespace App\Http\Controllers;

class OperatorHomeController
{
    public function index()
    {
        //toastr()->info('Are you the 6 fingered man?');
        return view('operator.home');
    }
}
