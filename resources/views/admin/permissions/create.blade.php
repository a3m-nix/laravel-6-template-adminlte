@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        Create Permission
    </div>

    <div class="card-body">
        <form action="{{ route("admin.permissions.store") }}" method="POST" >
            @csrf
            <div class="form-group {{ $errors->has('title') ? 'has-error' : '' }}">
                <label for="name">Name*</label>
                <input type="text" id="title" name="name" autofocus class="form-control" value="{{ old('name', isset($permission) ? $permission->title : '') }}">
                @if($errors->has('name'))
                    <p class="help-block">
                        {{ $errors->first('name') }}
                    </p>
                @endif
                <p class="helper-block">
                    {{ $errors->first('name') }}
                </p>
            </div>
            <div>
                <input class="btn btn-primary" type="submit" value="{{ trans('global.save') }}">
            </div>
        </form>
    </div>
</div>
@endsection