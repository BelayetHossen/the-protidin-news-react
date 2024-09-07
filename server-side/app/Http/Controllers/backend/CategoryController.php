<?php

namespace App\Http\Controllers\backend;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SubSubCategory;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    // all categories
    function allCategories() {
        $Categories = Category::with('subCategory')->get();
        return response()->json([
            'categories' => $Categories,
            'code'  => 201
        ]);
    }

    // single category
    function categoryGet($id) {
        $data = Category::with('subCategory')->find($id);
        return response()->json([
            'category' => $data,
            'code'  => 201
        ]);
    }

    // category store
    public function categoryStore(Request $request)
    {
        $exist_name = Category::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists',
                'code'  => 422
            ]);
        }

        if (empty($exist_name)) {
            $data = new Category();
            $data->name = $request->name;
            $data->slug = Str::slug($request->name);

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->move(base_path('images/categories'), $imageName);
                $data->photo = $imageName;
            } else {
                $imageName = '';
            }
            $data->save();
            return response()->json([
                'message' => 'New category saved successfully',
                'code'  => 201
            ]);
        }
    }

    // category update
    public function categoryUpdate(Request $request)
    {
        $data = Category::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = Category::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }

        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists'.' '.$request->name,
                'code'  => 422
            ]);
        }

        $imageName = $request->old_photo;
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(base_path('images/categories'), $imageName);

            // Delete old photo if it exists
            if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
                unlink(base_path('images/categories/' . $data->photo));
            }
        }
        if (empty($exist_name)) {

            $data->name = $request->name;
            $data->slug = Str::slug($request->name);

            $data->photo = $imageName;
            $data->update();
            return response()->json([
                'data' => $request->all(),
                'message' => 'Category updated successfully',
                'code'  => 201
            ]);
        }

    }

    // category status change
    public function categoryStatus($id)
    {
        $data = Category::find($id);
        if ($data->status===1) {
            $data->status = false;
        } else {
            $data->status = true;
        }
        $data->update();
        return response()->json(['code'=>201,'message' => 'Status change successfully']);
    }

    // category status change
    public function categoryShowHome($id)
    {
        $data = Category::find($id);
        $homeCategories = Category::where('show_home', true)->get();
        if ($data->show_home===1) {
            $data->show_home = false;
            $data->update();
            return response()->json(['code'=>201,'message' => 'Show-home change successfully']);
        }
        if ($homeCategories->count() < 8) {
            if ($data->show_home===0) {
                $data->show_home = true;
            }
            $data->update();
            return response()->json(['code'=>201,'message' => 'Show-home change successfully']);
        } else {
            return response()->json(['code'=>401,'message' => 'Only select 8 categories']);
        }

    }

    // category delete
    public function categoryDelete($id)
    {
        $data = Category::find($id);
        // Delete old photo if it exists
        if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
            unlink(base_path('images/categories/' . $data->photo));
        }
        $data->delete();
        return response()->json(['code'=>201,'message' => 'Category deleted successfully']);
    }










    // all sub categories
    function allSubCategories() {
        $subCategories = SubCategory::with('mainCategory')->get();
        return response()->json([
            'subCategories' => $subCategories,
            'code'  => 201
        ]);
    }

    // single sub category
    function subCategoryGet($id) {
        $data = SubCategory::with('mainCategory')->find($id);
        return response()->json([
            'subcategory' => $data,
            'code'  => 201
        ]);
    }

    // sub category store
    public function subCategoryStore(Request $request)
    {
        $exist_name = SubCategory::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists',
                'code'  => 422
            ]);
        }

        if (empty($exist_name)) {
            $data = new SubCategory();
            $data->name = $request->name;
            $data->slug = Str::slug($request->name);
            $data->category_id = $request->category_id;

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->move(base_path('images/categories'), $imageName);
                $data->photo = $imageName;
            } else {
                $imageName = '';
            }
            $data->save();
            return response()->json([
                'message' => 'New sub category saved successfully',
                'code'  => 201
            ]);
        }
    }

    // sub category update
    public function subCategoryUpdate(Request $request)
    {
        $data = SubCategory::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = SubCategory::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }

        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists'.' '.$request->name,
                'code'  => 422
            ]);
        }

        $imageName = $request->old_photo;
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(base_path('images/categories'), $imageName);

            // Delete old photo if it exists
            if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
                unlink(base_path('images/categories/' . $data->photo));
            }
        }
        if (empty($exist_name)) {

            $data->name = $request->name;
            $data->slug = Str::slug($request->name);
            $data->category_id = $request->category_id;

            $data->photo = $imageName;
            $data->update();
            return response()->json([
                'data' => $request->all(),
                'message' => 'Category updated successfully',
                'code'  => 201
            ]);
        }

    }

    // sub category status change
    public function subCategoryStatus($id)
    {
        $data = SubCategory::find($id);
        if ($data->status===1) {
            $data->status = false;
        } else {
            $data->status = true;
        }
        $data->update();
        return response()->json(['code'=>201,'message' => 'Status change successfully']);
    }

    // sub category delete
    public function subCategoryDelete($id)
    {
        $data = SubCategory::find($id);
        // Delete old photo if it exists
        if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
            unlink(base_path('images/categories/' . $data->photo));
        }
        $data->delete();
        return response()->json(['code'=>201,'message' => 'Category deleted successfully']);
    }












    // Sub category get by change category
    function subCategoryGetByCategory($id)
    {
        $data = Category::with('subCategory')->find($id);
        return response()->json(['code'=>201,'data' => $data]);
    }
    // Sub-sub category get by change sub-category
    function subSubCategoryGetBySubCategory($id)
    {
        $data = SubCategory::with('subSubCategory')->find($id);
        return response()->json(['code'=>201,'data' => $data]);
    }
    // all sub sub categories
    function allSubSubCategories() {
        $subCategories = SubSubCategory::with('mainCategory')->with('subCategory')->get();
        return response()->json([
            'subSubCategories' => $subCategories,
            'code'  => 201
        ]);
    }
    // single sub sub category
    function subSubCategoryGet($id) {
        $data = SubSubCategory::with('mainCategory')->with('subCategory')->find($id);
        return response()->json([
            'subSubCategory' => $data,
            'code'  => 201
        ]);
    }
    // sub sub category store
    public function subsubCategoryStore(Request $request)
    {
        $exist_name = SubSubCategory::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists',
                'code'  => 422
            ]);
        }

        if (empty($exist_name)) {
            $data = new SubSubCategory();
            $data->name = $request->name;
            $data->slug = Str::slug($request->name);
            $data->category_id = $request->category_id;
            $data->sub_category_id = $request->sub_category_id;

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->move(base_path('images/categories'), $imageName);
                $data->photo = $imageName;
            } else {
                $imageName = '';
            }
            $data->save();
            return response()->json([
                'message' => 'New sub-sub category saved successfully',
                'code'  => 201
            ]);
        }
    }

    // sub sub category update
    public function subSubCategoryUpdate(Request $request)
    {
        $data = SubSubCategory::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = SubSubCategory::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }

        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'The name already exists'.' '.$request->name,
                'code'  => 422
            ]);
        }

        $imageName = $request->old_photo;
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(base_path('images/categories'), $imageName);

            // Delete old photo if it exists
            if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
                unlink(base_path('images/categories/' . $data->photo));
            }
        }
        if (empty($exist_name)) {

            $data->name = $request->name;
            $data->slug = Str::slug($request->name);
            $data->category_id = $request->category_id;
            $data->sub_category_id = $request->sub_category_id;

            $data->photo = $imageName;
            $data->update();
            return response()->json([
                'data' => $request->all(),
                'message' => 'Category updated successfully',
                'code'  => 201
            ]);
        }

    }

    // sub sub category status change
    public function subSubCategoryStatus($id)
    {
        $data = SubSubCategory::find($id);
        if ($data->status===1) {
            $data->status = false;
        } else {
            $data->status = true;
        }
        $data->update();
        return response()->json(['code'=>201,'message' => 'Status change successfully']);
    }

    // sub sub category delete
    public function subSubCategoryDelete($id)
    {
        $data = SubSubCategory::find($id);
        // Delete old photo if it exists
        if ($data->photo && file_exists(base_path('images/categories/' . $data->photo))) {
            unlink(base_path('images/categories/' . $data->photo));
        }
        $data->delete();
        return response()->json(['code'=>201,'message' => 'Category deleted successfully']);
    }




}
