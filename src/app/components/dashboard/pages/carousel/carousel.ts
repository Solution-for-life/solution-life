import { Component, inject } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { BasicTableThreeComponent } from '../../../tables/basic-tables/basic-table-three/basic-table-three.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { ModalComponent } from '../../../ui/modal/modal.component';
import { InputFieldComponent } from '../../../form/input/input-field.component';
import { DropzoneComponent } from '../../../form/form-elements/dropzone/dropzone.component';
import { TextAreaComponent } from '../../../form/input/text-area.component';
import { LabelComponent } from '../../../form/label/label.component';
import { ModalService } from '../../../../services/modal.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatabaseService } from '@dbService/database.service';
import { Image } from '@interfaces/image';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe
],
  templateUrl: './carousel.html',
  styles: ``
})
export class Carousel {

  readonly modalService = inject(ModalService);
  private readonly fb = inject(FormBuilder);
  private readonly storage = inject(Storage);
  private readonly dbService = inject(DatabaseService);
  public imagesCarousel: Image[] = [];
  public filePathGenerated: string = '';
  public fieldTouched = false;
  public uploadedFile: File | null = null;
  public imagePreview: string | null = null;

  form : FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [null, Validators.required]
  });

  closeModal() {
    this.modalService.closeModal();
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

    // ⚠️ NO subir todavía, solo guardamos file en memoria
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
  }

  async handleSave() {
      // Handle save logic here
    if (this.form.invalid || !this.uploadedFile) {
      console.warn('Formulario inválido o sin imagen seleccionada');
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
        await uploadBytes(storageRef, file);
        const downloadURL = await this.dbService.getImageURL(this.filePathGenerated);

        // Guardas el link en el form para enviarlo a DB
        this.form.patchValue({ image: downloadURL });



        console.log('✅ Imagen subida:', this.filePathGenerated);
        console.log('📌 Form listo para enviar:', this.form.value);

        await this.dbService.setItem('carouselImages', this.form.value);
        this.modalService.closeModal();
        await this.getImages();
      } catch (error) {
        console.error('❌ Error subiendo imagen', error);
      }
  }

  async ngOnInit() {
    await this.getImages();
    console.log('Images:', this.imagesCarousel);
  }

}
