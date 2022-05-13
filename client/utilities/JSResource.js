class Resource {
   static map = new Map();
 
   _moduleId;
   _loader;
   _loadingPromise;
   _module;
 
   constructor(moduleId, loader) {
     this._moduleId = moduleId;
     this._loader = loader;
     this._loadingPromise = undefined;
     this._module = undefined;
   }
 
   getModuleId() {
     return this._moduleId;
   }
 
   getModuleIfRequired() {
     return this._module;
   }
 
   load() {
     if (!this._loadingPromise) {
       this._loadingPromise = this._loader()
         .then((module) => {
           this._module = module;
           return this._module;
         })
         .catch((error) => {
           console.log(error);
           throw error;
         });
     }
     return this._loadingPromise;
   }
 }
 
 export default function JSResource(
   moduleId,
   loader,
 ) {
   let resource = Resource.map.get(moduleId);
   if (resource == null) {
     resource = new Resource(moduleId, loader);
     Resource.map.set(moduleId, resource);
   }
   return resource;
 }
 