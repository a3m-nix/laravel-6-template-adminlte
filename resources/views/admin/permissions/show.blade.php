@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        Show Permission
    </div>

    <div class="card-body">
        <table class="table table-bordered table-striped">
            <tbody>
                <tr>
                    <th>Guard</th>
                    <td>
                        {{ $permission->guard_name }}
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        {{ $permission->name }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

@endsection