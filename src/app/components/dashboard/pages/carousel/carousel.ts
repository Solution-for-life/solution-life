import { Component, inject, ViewChild } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { BasicTableThreeComponent } from '../../../tables/basic-tables/basic-table-three/basic-table-three.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { ModalComponent } from '../../../ui/modal/modal.component';
import { InputFieldComponent } from '../../../form/input/input-field.component';
import { DropzoneComponent } from '../../../form/form-elements/dropzone/dropzone.component';
import { TextAreaComponent } from '../../../form/input/text-area.component';
import { LabelComponent } from '../../../form/label/label.component';
import { ModalService } from '../../../../services/modal.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatabaseService } from '@dbService/database.service';
import { Image } from '@interfaces/image';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-carousel',
  imports: [
    ComponentCardComponent,
    BasicTableThreeComponent,
    ButtonComponent,
    ModalComponent,
    InputFieldComponent,
    DropzoneComponent,
    TextAreaComponent,
    LabelComponent,
    FormsModule,
    ReactiveFormsModule,
],
  templateUrl: './carousel.html',
  styles: ``
})
export class Carousel {

  readonly modalService = inject(ModalService);
  private readonly fb = inject(FormBuilder);
  private readonly storage = inject(Storage);
  private readonly dbService = inject(DatabaseService);
  private readonly loaderService = inject(LoaderService);
  public imagesCarousel: Image[] = [];
  public filePathGenerated: string = '';
  public fieldTouched = false;
  public uploadedFile: File | null = null;
  public imagePreview: string | null = null;
  @ViewChild('dropzone') dropzone!: DropzoneComponent;



  form : FormGroup = this.fb.group({
    name: ['', Validators.required],
    name_es: ['', Validators.required],
    description: ['', Validators.required],
    description_es: ['', Validators.required],
    image: [null, Validators.required]
  });

  closeModal() {
    this.modalService.closeModal();
    this.form.reset();
    if(this.dropzone)
    {
      this.dropzone.reset();
    }
  }

  openModal() {
    this.modalService.openModal();
  }

  async getImages() {
    const images = await this.dbService.getCollection('carouselImages');
    this.imagesCarousel = Object.values(images ?? {});
  }

  async onFileChange(event: Event) {
    this.fieldTouched = true;
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.uploadedFile = file;

    // Vista previa
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);

    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
  }

  async handleSave() {
    if (this.form.invalid || !this.uploadedFile) {
      console.warn('Formulario inválido o sin imagen seleccionada');
      this.form.markAllAsTouched();
      return;
    }


    const file = this.uploadedFile;
    const ext = file.name.split('.').pop();
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedName = baseName.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    const finalName = `${sanitizedName}.${ext}`;

    this.filePathGenerated = `carouselImages/${Date.now()}_${finalName}`;
    const storageRef = ref(this.storage, this.filePathGenerated);

    try {
      this.loaderService.setLoader(true);
      await uploadBytes(storageRef, file);

      const downloadURL = await this.dbService.getImageURL(this.filePathGenerated);

      const newImage : Image = {
        name: {
          en: this.form.value.name,
          es: this.form.value.name_es
        },
        description: {
          en: this.form.value.description,
          es: this.form.value.description_es
        },
        image: downloadURL,
        storagePath: this.filePathGenerated,
        createdAt: new Date().toISOString(),
        updatedAt: ''
      };

      // 4. Guardar en la DB
      await this.dbService.setItem('carouselImages', newImage);

      this.loaderService.setLoader(false);

      console.log('✅ Imagen subida:', this.filePathGenerated);
      console.log('📌 Guardado en DB:', newImage);

      // 5. Cerrar modal y refrescar lista
      this.closeModal();
      await this.getImages();

    } catch (error) {
      console.error('❌ Error subiendo imagen', error);
      this.loaderService.setLoader(false);
    }
  }

  async ngOnInit() {
    await this.getImages();
  }

}
