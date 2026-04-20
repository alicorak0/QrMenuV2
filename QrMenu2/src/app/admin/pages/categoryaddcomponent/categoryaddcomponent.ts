import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category-service';
@Component({
  selector: 'app-categoryaddcomponent',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './categoryaddcomponent.html',
  styleUrl: './categoryaddcomponent.css',
})
export class Categoryaddcomponent implements OnInit  {

categoryAddForm!: FormGroup;        // Reactive form

constructor(private formBuilder: FormBuilder,private toastrService:ToastrService,
  private categoryService:CategoryService
){}


ngOnInit(): void {
      this.createCategoryAddForm()

  }


   createCategoryAddForm(){

    this.categoryAddForm = this.formBuilder.group({
    categoryName:["",Validators.required],


    }) 
    }

addCategory() {
  // Form geçerliliğini kontrol et
  if (this.categoryAddForm.invalid){
    this.toastrService.error('Lütfen tüm alanları doldurun!'); 
    return;
  }

  const categoryData = this.categoryAddForm.value;

  this.categoryService.addCategory(categoryData).subscribe({
    next: (res: any) => {
      // Başarılı ekleme
      this.toastrService.success(res.message || 'Kategori başarıyla eklendi!');
      this.categoryAddForm.reset();
    },
    error: (err: any) => {
      // Backend ErrorResult ile döndüğü için mesaj err.error.message'de
      if (err.error && err.error.message) {
        this.toastrService.error(err.error.message);
      } else {
        this.toastrService.error('Kategori eklenemedi!'); 
      }
      console.error(err);
    }
  });
}
}
