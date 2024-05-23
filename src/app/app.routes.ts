import { Routes, UrlSegment } from '@angular/router';
import { LoginComponent } from './shared/pages/login/login.component';
import { AdminComponent } from './shared/pages/admin/admin.component';
import { BookComponent } from './features/book/book.component';
import { UserComponent } from './features/user/user.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ActivationComponent } from './shared/pages/activation/activation.component';
import { BookDetailsComponent } from './features/book/book-details/book-details.component';
import { AddBookComponent } from './features/book/add-book/add-book.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { LocationComponent } from './features/location/location.component';
import { AddLocationComponent } from './features/location/add-location/add-location.component';
import { AuthorComponent } from './features/author/author.component';
import { AddAuthorComponent } from './features/author/add-author/add-author.component';
import { PublisherComponent } from './features/publisher/publisher.component';
import { AddPublisherComponent } from './features/publisher/add-publisher/add-publisher.component';
import { AllmaterialsComponent } from './features/allmaterials/allmaterials.component';
import { MagazineComponent } from './features/magazine/magazine.component';
import { MaterialComponent } from './features/material/material.component';
import { EBookComponent } from './features/e-book/e-book.component';
import { AddMagazineComponent } from './features/magazine/add-magazine/add-magazine.component';
import { AddMaterialComponent } from './features/material/add-material/add-material.component';
import { UpdateBookComponent } from './features/book/update-book/update-book.component';
import { getDatabyIdResolver } from './shared/resolver/getdata/get-databy-id.resolver';
import { UpdateLocationComponent } from './features/location/update-location/update-location.component';
import { UpdatePublisherComponent } from './features/publisher/update-publisher/update-publisher.component';
import { UpdateAuthorComponent } from './features/author/update-author/update-author.component';
import { UpdateMagazineComponent } from './features/magazine/update-magazine/update-magazine.component';
import { VerifyComponent } from './shared/pages/verify/verify.component';
import { AddEBookComponent } from './features/e-book/add-e-book/add-e-book.component';
import { UpdateEBookComponent } from './features/e-book/update-e-book/update-e-book.component';
import { AnnoucementComponent } from './features/annoucement/annoucement.component';
import { AddAnnouncementComponent } from './features/annoucement/add-announcement/add-announcement.component';
import { UpdateAnnouncementComponent } from './features/annoucement/update-announcement/update-announcement.component';
import { UpdateMaterialComponent } from './features/material/update-material/update-material.component';
import { FinepaymentComponent } from './features/finepayment/finepayment.component';
import { CatalogDetailsComponent } from './features/catalog/catalog-details/catalog-details.component';
import { CreateStaffComponent } from './features/user/create-staff/create-staff.component';
import { BookReservationComponent } from './features/book/book-reservation/book-reservation.component';
import { FeedbackComponent } from './features/feedback/feedback.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersettingsComponent } from './features/usersettings/usersettings.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'login/Activation',component:ActivationComponent},
    {matcher: (url) => {
        if (url.length === 1 && url[0].path == 'ActivationKey' ) {
            console.log(url)
          return {consumed: url, posParams: {activationKey: new UrlSegment(url[0].path.slice(1), {})}};
        }
        return null;
      },component:VerifyComponent },
    {path:'admin',redirectTo:'admin/dashboard'},
    {path:'admin/all-materials',redirectTo:'admin/all-materials/magazine'},
    {path:'admin',
    component:AdminComponent,
    children:[
        {
            path:'dashboard',
            component:DashboardComponent,
        },
        {
            path:'book',
            component:BookComponent,
            canActivate:[authGuard]
        },
        {
            path:'book/reservation',
            component:BookReservationComponent
        },
        {
            path:'user',
            component:UserComponent
        },
        {
            path:'user/create-staff',
            component:CreateStaffComponent
        },
        {
            path:'user/feedback',
            component:FeedbackComponent
        },
        { 
            path: 'book/:id', 
            component: BookDetailsComponent 
        },
        { 
            path: 'book-add', 
            component: AddBookComponent 
        },
        { 
            path: 'catalog', 
            component: CatalogComponent 
        },
        { 
            path: 'location', 
            component: LocationComponent 
        },
        { 
            path: 'location-add', 
            component: AddLocationComponent 
        },
        { 
            path: 'author', 
            component: AuthorComponent 
        },
        { 
            path: 'author-add', 
            component: AddAuthorComponent 
        },
        { 
            path: 'publisher', 
            component: PublisherComponent 
        },
        { 
            path: 'publisher-add', 
            component: AddPublisherComponent 
        },
        { 
            path: 'all-materials', 
            component: AllmaterialsComponent ,
            children:[
                { 
                    path: 'magazine', 
                    component: MagazineComponent 
                },
                { 
                    path: 'material', 
                    component: MaterialComponent 
                },
                { 
                    path: 'e-book', 
                    component: EBookComponent 
                },
                { 
                    path: 'add-e-book', 
                    component: AddEBookComponent 
                },
                { 
                    path: 'add-magazine', 
                    component: AddMagazineComponent 
                },
                { 
                    path: 'add-material', 
                    component: AddMaterialComponent 
                },
                { 
                    path: 'update/magazine/:id', 
                    component: UpdateMagazineComponent,
                    resolve:{ data:getDatabyIdResolver },
                    data:{
                        controller:"Magazines"
                    }
                },
                { 
                    path: 'update/e-book/:id', 
                    component: UpdateEBookComponent,
                    resolve:{ data:getDatabyIdResolver },
                    data:{
                        controller:"EBooks"
                    }
                },
                { 
                    path: 'material/update/:id', 
                    component: UpdateMaterialComponent,
                    resolve:{ data:getDatabyIdResolver },
                    data:{
                        controller:"Materials"
                    }
                }
            ]
        },
        { 
            path: 'book/update/:id', 
            component: UpdateBookComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"Books"
            }
        },
        { 
            path: 'location/update/:id', 
            component: UpdateLocationComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"Locations"
            }
        },
        { 
            path: 'publisher/update/:id', 
            component: UpdatePublisherComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"Publishers"
            }
        },
        { 
            path: 'author/update/:id', 
            component: UpdateAuthorComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"Authors"
            }
        },
        { 
            path: 'announcement', 
            component: AnnoucementComponent 
        },
        { 
            path: 'profile-setting/:id', 
            component: UsersettingsComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"LibraryStaffs"
            } 
        },
        { 
            path: 'announcement/add', 
            component: AddAnnouncementComponent 
        },
        { 
            path: 'announcement/update/:id', 
            component: UpdateAnnouncementComponent,
            resolve:{ data:getDatabyIdResolver },
            data:{
                controller:"Announcements"
            }
        },
        { 
            path: 'finepayment', 
            component: FinepaymentComponent 
        },
        { 
            path: 'catalog/:id', 
            component: CatalogDetailsComponent 
        }
    ]}
];
